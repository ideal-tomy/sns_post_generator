'use client';

import { useState } from 'react';

type CaptionOutputProps = {
  caption: string;
};

export default function CaptionOutput({ caption }: CaptionOutputProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました:', err);
    }
  };
  
  if (!caption) return null;
  
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold mb-4">生成されたキャプション</h2>
      
      <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap text-gray-800 mb-4">
        {caption}
      </div>
      
      <button
        onClick={handleCopy}
        className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-md flex items-center text-sm transition-colors"
      >
        {copied ? (
          <>
            <CheckIcon className="w-4 h-4 mr-1" />
            コピー済み
          </>
        ) : (
          <>
            <CopyIcon className="w-4 h-4 mr-1" />
            コピー
          </>
        )}
      </button>
    </div>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
