'use client';

import { useState, useCallback } from 'react';

type DescriptionInputProps = {
  onDescriptionChange: (text: string) => void;
  disabled?: boolean;
};

const MAX_LENGTH = 200;

export default function DescriptionInput({ onDescriptionChange, disabled = false }: DescriptionInputProps) {
  const [text, setText] = useState('');
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_LENGTH) {
      setText(newText);
      onDescriptionChange(newText);
    }
  }, [onDescriptionChange]);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          説明文
        </label>
        <span className={`text-xs ${MAX_LENGTH - text.length < 20 ? 'text-red-500' : 'text-gray-500'}`}>
          {MAX_LENGTH - text.length}/{MAX_LENGTH}
        </span>
      </div>
      
      <textarea
        id="description"
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        rows={4}
        placeholder="商品やサービスの説明、PRポイントなどを入力してください"
        value={text}
        onChange={handleChange}
        disabled={disabled}
      />
      
      <p className="text-xs text-gray-500 mt-2">キャプション生成のヒントとなるキーワードや商品説明を入力してください</p>
    </div>
  );
}
