/**
 * 一般的なユーティリティ関数を集めたファイル
 */

/**
 * 正しいファイル形式かどうかをチェック
 * @param file チェックするファイル
 * @returns 画像ファイルであればtrue
 */
export function isValidImageFile(file: File): boolean {
  // 許可する画像形式のMIMEタイプ
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * ファイルサイズが制限以内かチェック
 * @param file チェックするファイル
 * @param maxSizeInBytes 最大サイズ（バイト）
 * @returns 制限内であればtrue
 */
export function isFileSizeValid(file: File, maxSizeInBytes: number = 5 * 1024 * 1024): boolean {
  return file.size <= maxSizeInBytes;
}

/**
 * APIリクエスト用のタイムアウト処理
 * @param ms タイムアウト時間（ミリ秒）
 * @returns タイムアウト時にrejectするPromise
 */
export function timeoutPromise(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`処理がタイムアウトしました（${ms}ms）`));
    }, ms);
  });
}

/**
 * APIリクエストをタイムアウト付きで実行
 * @param promise 元のPromise
 * @param timeoutMs タイムアウト時間（ミリ秒）
 * @returns タイムアウト機能付きのPromise
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number = 10000): Promise<T> {
  return Promise.race([promise, timeoutPromise(timeoutMs)]);
}
