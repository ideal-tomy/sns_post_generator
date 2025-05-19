'use client';

import { useState } from 'react';
import ImageUpload from '@/components/image-upload';
import DescriptionInput from '@/components/description-input';
import LoadingState from '@/components/loading-state';

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (file: File | null, preview: string | null) => {
    setImage(file);
    setImagePreview(preview);
    setDescription('');
    setError(null);

    if (file && preview) {
      setIsGeneratingDescription(true);
      setError(null);
      try {
        const response = await fetch('/api/generate-description-sample', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageBase64: preview }),
        });

        const data = await response.json();

        if (response.ok) {
          setDescription(data.descriptionSample || '');
        } else {
          setError(data.message || '説明文のサンプル生成に失敗しました。');
        }
      } catch (err) {
        console.error('Error generating description sample:', err);
        setError('説明文のサンプル生成中にエラーが発生しました。');
      } finally {
        setIsGeneratingDescription(false);
      }
    }
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-6">Instagram投稿文生成</h1>
      
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-6">
          画像と簡単な説明文から、Instagramに最適な投稿文を自動生成します。
        </p>
        
        <ImageUpload onImageChange={handleImageChange} />
        
        {isGeneratingDescription && (
          <div className="flex items-center justify-center my-4">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-700">説明文のヒントを生成中...</p>
          </div>
        )}
        
        <DescriptionInput 
          onDescriptionChange={handleDescriptionChange} 
          disabled={isGeneratingDescription}
          value={description}
        />
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <div className="flex space-x-2 mt-6">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            onClick={() => alert('投稿機能は未実装です。')}
            disabled={isGeneratingDescription || !image || !description.trim()}
          >
            投稿
          </button>
          <button
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            onClick={() => alert('下書き保存機能は未実装です。')}
            disabled={isGeneratingDescription || !image || !description.trim()}
          >
            下書き保存
          </button>
        </div>
      </div>
      
      {isGeneratingDescription && <LoadingState />}
    </div>
  );
}
