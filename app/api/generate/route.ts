import { NextRequest, NextResponse } from "next/server";
import { generateCaption } from "@/lib/openai";

// Edge Runtimeを使用
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await req.json();
    
    // 画像とテキストが提供されているか確認
    if (!body.image || !body.description) {
      return NextResponse.json(
        { error: "画像と説明文の両方が必要です" },
        { status: 400 }
      );
    }
    
    // Base64エンコードされた画像データを取得
    const imageBase64 = body.image;
    const description = body.description;
    
    // OpenAI APIを呼び出し
    const caption = await generateCaption(imageBase64, description);
    
    // 生成されたキャプションを返す
    return NextResponse.json({
      caption,
      status: "success"
    });
    
  } catch (error) {
    console.error("Error in generate API:", error);
    
    return NextResponse.json(
      { 
        status: "error",
        message: error instanceof Error ? error.message : "キャプション生成中にエラーが発生しました"
      },
      { status: 500 }
    );
  }
}
