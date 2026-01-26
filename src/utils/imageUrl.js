/**
 * Retourne l'URL complète de l'image
 * @param {string} imageUrl - L'URL de l'image (peut être relative ou absolue)
 * @returns {string} L'URL complète de l'image
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return '';
  }

  
  return `${process.env.NEXT_PUBLIC_API_KEY}${imageUrl}`;
};

