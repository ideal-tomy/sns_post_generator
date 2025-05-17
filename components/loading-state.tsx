'use client';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
        <span className="sr-only">ローディング中...</span>
      </div>
    </div>
  );
}
