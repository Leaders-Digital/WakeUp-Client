/**
 * Retourne l'URL complète de l'image
 * Si l'URL est déjà complète (commence par http/https), elle est retournée telle quelle
 * Sinon, le préfixe de l'API est ajouté
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

  // Sinon, ajouter le préfixe de l'API
  return `${process.env.NEXT_PUBLIC_API_KEY}${imageUrl}`;
};

