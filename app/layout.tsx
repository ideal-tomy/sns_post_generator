import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instagram投稿文生成アプリ',
  description: '画像と説明文からInstagram投稿用のキャプションを自動生成',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
