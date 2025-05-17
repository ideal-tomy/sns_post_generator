import sharp from 'sharp';

/**
 * u753bu50cfu30c7u30fcu30bfu3092u6700u9069u5316u3057u3001Base64u5f62u5f0fu306bu5909u63dbu3059u308b
 * @param file u30a2u30c3u30d7u30edu30fcu30c9u3055u308cu305fu30d5u30a1u30a4u30eb
 * @returns Base64u30a8u30f3u30b3u30fcu30c9u3055u308cu305fu753bu50cfu30c7u30fcu30bf
 */
export async function processAndEncodeImage(file: File): Promise<string> {
  try {
    // Fileu3092ArrayBufferu306bu5909u63db
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // sharpu3067u753bu50cfu3092u6700u9069u5316uff08u30eau30b5u30a4u30bau3001u5727u7e2euff09
    const processedImageBuffer = await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }) // u6700u5927u30b5u30a4u30bau3092u6307u5b9a
      .jpeg({ quality: 80 }) // JPEGu5f62u5f0fu3067u54c1u8cea80%u3067u4fddu5b58
      .toBuffer();
    
    // Base64u30a8u30f3u30b3u30fcu30c9
    return processedImageBuffer.toString('base64');
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('u753bu50cfu51e6u7406u4e2du306bu30a8u30e9u30fcu304cu767au751fu3057u307eu3057u305f');
  }
}

/**
 * u30afu30e9u30a4u30a2u30f3u30c8u30b5u30a4u30c9u3067u306eBase64u30a8u30f3u30b3u30fcu30c9u51e6u7406
 * sharpu304cu4f7fu3048u306au3044u30afu30e9u30a4u30a2u30f3u30c8u30b5u30a4u30c9u3067u306fu3053u3061u3089u3092u4f7fu7528
 */
export async function encodeImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // data:image/jpeg;base64,XXXX u306eu5f62u5f0fu304bu3089u3001Base64u90e8u5206u3060u3051u3092u62bdu51fa
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
}
