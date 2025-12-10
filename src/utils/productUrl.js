/**
 * Retourne l'URL SEO-friendly d'un produit
 * Utilise le handle s'il existe, sinon utilise l'ID comme fallback
 * @param {Object} product - L'objet produit avec _id et handle
 * @returns {string} L'URL du produit
 */
export const getProductUrl = (product) => {
  if (!product) {
    return '/product';
  }

  // Utiliser le handle s'il existe, sinon utiliser l'ID
  const identifier = product.handle || product._id;
  
  return `/product/${identifier}`;
};

