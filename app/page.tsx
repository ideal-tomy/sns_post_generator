'use client';

import { useState } from 'react';
import ImageUpload from '@/components/image-upload';
import DescriptionInput from '@/components/description-input';
import CaptionOutput from '@/components/caption-output';
import LoadingState from '@/components/loading-state';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null, preview: string | null) => {
    setImage(file);
    setImagePreview(preview);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleGenerate = async () => {
    // 入力チェック
    if (!image || !imagePreview) {
      setError('画像をアップロードしてください');
      return;
    }

    if (!description.trim()) {
      setError('説明文を入力してください');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Base64データの前に付いているdata:image/jpeg;base64,などの部分を削除
      const base64Data = imagePreview.split(',')[1];

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Data,
          description,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setCaption(data.caption);
      } else {
        setError(data.message || 'キャプションの生成に失敗しました');
      }
    } catch (err) {
      console.error('Error generating caption:', err);
      setError('リクエスト中にエラーが発生しました。再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-6">Instagram投稿文生成</h1>
      
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-6">
          画像と簡単な説明文から、Instagramに最適な投稿文を自動生成します。
        </p>
        
        <ImageUpload onImageChange={handleImageChange} />
        
        <DescriptionInput 
          onDescriptionChange={handleDescriptionChange} 
          disabled={isLoading} 
        />
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          onClick={handleGenerate}
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : 'キャプションを生成'}
        </button>
      </div>
      
      {isLoading && <LoadingState />}
      
      {caption && !isLoading && <CaptionOutput caption={caption} />}
    </div>
  );
}
