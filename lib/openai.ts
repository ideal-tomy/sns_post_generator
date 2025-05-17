import OpenAI from 'openai';

// OpenAI APIクライアントのインスタンスを作成
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCaption(imageBase64: string, description: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "あなたはInstagramマーケティングの専門家です。飲食店や小売店のInstagram投稿向けに、魅力的で自然なキャプション（投稿文）を作成してください。適切な絵文字を含め、読みやすい段落分けを行い、雰囲気に合ったトーンで書いてください。"
        },
        {
          role: "user",
          content: [
            { type: "text", text: `以下の画像と説明文を元に、Instagramの投稿用キャプションを作成してください。説明文: ${description}` },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
          ]
        }
      ],
      max_tokens: 500
    });
    
    return response.choices[0].message.content || ""
  } catch (error) {
    console.error('Error generating caption:', error);
    throw new Error('キャプション生成中にエラーが発生しました。しばらく時間をおいて再度お試しください。');
  }
}
