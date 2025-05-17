# Instagram投稿文生成アプリ

画像と簡単な説明文から、Instagramに最適な投稿文（キャプション）を自動生成するアプリケーションです。OpenAIのGPT-4oモデルを利用して、魅力的で読みやすいキャプションを生成します。

## 機能

- 画像アップロード（ドラッグ＆ドロップ対応）
- 説明文入力
- AIによる投稿文自動生成
- 生成された投稿文のワンクリックコピー

## 技術スタック

- **フロントエンド**: Next.js 14, React, Tailwind CSS
- **バックエンド**: Next.js API Routes (Edge Functions)
- **AI/ML**: OpenAI GPT-4o
- **画像処理**: sharp

## セットアップ

### 前提条件

- Node.js 20.x以上
- OpenAI APIキー

### インストール

1. このリポジトリをクローンします
   ```bash
   git clone <repository-url>
   cd insta-post-gen
   ```

2. 依存関係をインストールします
   ```bash
   npm install
   ```

3. `.env.local.example`をコピーして`.env.local`を作成し、OpenAI APIキーを設定します
   ```bash
   cp .env.local.example .env.local
   # エディタで.env.localを開いてAPIキーを設定してください
   ```

4. 開発サーバーを起動します
   ```bash
   npm run dev
   ```

5. ブラウザで[http://localhost:3000](http://localhost:3000)を開きます

## デプロイ

このアプリケーションはVercelに簡単にデプロイできます。

1. [Vercel](https://vercel.com)にアカウントを作成し、リポジトリをインポートします

2. 環境変数として`OPENAI_API_KEY`を設定します

3. デプロイを完了します

## ライセンス

MIT

## サポート

使用方法や質問があれば、お気軽にお問い合わせください。
