/**
 * Retourne l'URL complète de l'image
 * Si l'URL est déjà complète (commence par http/https), elle est retournée telle quelle
 * Sinon, utilise NEXT_PUBLIC_LOCAL pour les images locales (uploads/mainPicture)
 * @param {string} imageUrl - L'URL de l'image (peut être relative ou absolue)
 * @returns {string} L'URL complète de l'image
 */
export const getImageUrl = (imageUrl) => {
  if (!imageUrl) {
    return '';
  }

  // Si l'URL est déjà complète (commence par http:// ou https://), la retourner telle quelle
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Utiliser NEXT_PUBLIC_LOCAL pour les images locales (uploads/mainPicture)
  const localBaseUrl = process.env.NEXT_PUBLIC_LOCAL || '';
  
  // Si l'image commence par uploads/ ou contient mainPicture, utiliser NEXT_PUBLIC_LOCAL
  if (imageUrl.includes('uploads') || imageUrl.includes('mainPicture')) {
    // S'assurer que l'URL commence par / si nécessaire
    const cleanUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${localBaseUrl}${cleanUrl}`;
  }

  // Sinon, utiliser le préfixe de l'API pour les autres images
  return `${process.env.NEXT_PUBLIC_API_KEY}${imageUrl}`;
};

