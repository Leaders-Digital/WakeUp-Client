import productData from 'data/product/product';
import { CartContext, PromoContext } from 'pages/_app';
import { useContext } from 'react';
import { Card } from './Card/Card';

export const CheckoutOrders = ({total}) => {
  const { cart } = useContext(CartContext);
  const { promo } = useContext(PromoContext);

  // Calculate total with "buy 2 get 60% off on second item" promotion
  const calculateTotalWithPromotion = () => {
    if (cart.length < 2) return total;

    // Sort items by price to apply discount on cheaper item
    const sortedItems = [...cart].sort((a, b) => {
      const priceA = a.solde ? a.prix - a.prix * (a.soldePourcentage / 100) : a.prix;
      const priceB = b.solde ? b.prix - b.prix * (b.soldePourcentage / 100) : b.prix;
      return priceA - priceB;
    });

    let totalWithPromo = 0;
    let itemsCount = 0;

    // Calculate total with promotion
    sortedItems.forEach(item => {
      const prixFinal = item.solde
        ? item.prix - item.prix * (item.soldePourcentage / 100)
        : item.prix;

      for (let i = 0; i < item.quantity; i++) {
        itemsCount++;
        if (itemsCount % 2 === 0) {
          // Apply 60% discount on every second item
          totalWithPromo += prixFinal * 0.4;
        } else {
          totalWithPromo += prixFinal;
        }
      }
    });

    return totalWithPromo;
  };

  const totalWithPromotion = calculateTotalWithPromotion();
  const totalWithDiscount = promo
    ? totalWithPromotion - (totalWithPromotion * promo) / 100
    : totalWithPromotion;
               
  const getLoadingDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 2); // Add 2 days
    return futureDate.toLocaleDateString(); // Format as dd/mm/yyyy or mm/dd/yyyy depending on locale
  };

  const loadingDate = getLoadingDate(); // Get the dynamic loading date
  return (
    <>
      <div className='checkout-order'>
        <h5>Votre commande</h5>
        {cart.map((order) => (
          <Card key={order.id} order={order} />
        ))}
      </div>
      <div className='cart-bottom__total'>
        <div className='cart-bottom__total-goods'>
          Produits pour
          <span>{total} TND</span>
        </div>
        {cart.length >= 2 && (
          <div className='cart-bottom__total-promo'>
            Remise "Acheter 2 articles, le 2ème à -60%"
            <span>-{(total - totalWithPromotion).toFixed(2)} TND</span>
          </div>
        )}
        {promo && (
          <div className='cart-bottom__total-promo'>
            Réduction sur code promo
            <span>{promo}%</span>
          </div>
        )}
        <div className='cart-bottom__total-delivery'>
          Livraison{' '}
          <span className='cart-bottom__total-delivery-date'>
            {loadingDate}
          </span>
          <span>8 TND</span>
        </div>
        <div className='cart-bottom__total-num'>
          total:
          <span> {(totalWithDiscount + 8).toFixed(2)} TND </span>
        </div>
      </div>
    </>
  );
};
