'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

type ImageUploadProps = {
  onImageChange: (file: File | null, preview: string | null) => void;
};

export default function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  }, []);

  const handleFile = (file: File) => {
    // 画像ファイル以外は無視
    if (!file.type.match('image.*')) {
      alert('画像ファイルを選択してください');
      return;
    }

    // 5MB以上の画像は警告表示
    if (file.size > 5 * 1024 * 1024) {
      alert('5MB以下の画像ファイルをアップロードしてください');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const result = e.target.result as string;
        setPreview(result);
        onImageChange(file, result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setPreview(null);
    onImageChange(null, null);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        画像アップロード
      </label>
      
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <p className="text-gray-600">画像をドラッグ&ドロップ<br />または<br />クリックして選択</p>
          <input 
            id="file-upload" 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleChange} 
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image 
              src={preview} 
              alt="アップロードされた画像" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
            onClick={handleReset}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
      
      <p className="text-xs text-gray-500 mt-2">* 5MB以下のJPEG、PNG画像をアップロードしてください</p>
    </div>
  );
}
