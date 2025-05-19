import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const MODEL_NAME = 'gemini-1.5-flash-latest'; // モデル名を変更

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POSTメソッドのみ受け付けます' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'APIキーが設定されていません' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: '画像データが必要です' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 4096, // 必要に応じて調整
    };

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    // Base64データのプレフィックス (例: "data:image/jpeg;base64,") を削除
    const base64Data = imageBase64.split(',')[1];

    const parts = [
      {
        inlineData: {
          mimeType: 'image/jpeg', // 画像のMIMEタイプに合わせて変更 (例: image/png)
          data: base64Data,
        },
      },
      { text: 'この画像に合うInstagramのキャプションを1つだけ、200文字以内で提案してください。キャプションのテキストのみを返してください。説明や前置き、ハッシュタグの提案は不要です。' }, // プロンプトを修正
    ];

    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
      safetySettings,
    });

    if (result.response) {
      const descriptionSample = result.response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (descriptionSample) {
        return res.status(200).json({ descriptionSample });
      } else {
        console.error('Gemini APIからのレスポンス形式が予期したものと異なります:', result.response);
        return res.status(500).json({ message: '説明文の生成に失敗しました。' });
      }
    } else {
      console.error('Gemini APIからのレスポンスがありませんでした。');
      return res.status(500).json({ message: '説明文の生成中にエラーが発生しました。' });
    }

  } catch (error) {
    console.error('Error generating description sample:', error);
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    return res.status(500).json({ message: `説明文の生成中にエラーが発生しました: ${errorMessage}` });
  }
} 