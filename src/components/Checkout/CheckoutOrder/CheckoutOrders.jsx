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

    // Create a flat array of all items with their quantities
    const allItems = cart.flatMap(item => 
      Array(item.quantity).fill({
        prixFinal: item.solde 
          ? item.prix - item.prix * (item.soldePourcentage / 100)
          : item.prix
      })
    );

    // Sort items by price in descending order (highest first)
    allItems.sort((a, b) => b.prixFinal - a.prixFinal);

    let totalWithPromo = 0;

    // First item (most expensive) at full price
    totalWithPromo += allItems[0].prixFinal;
    
    // Second item (cheaper) gets 60% off
    totalWithPromo += allItems[1].prixFinal * 0.4;

    // All other items at full price
    for (let i = 2; i < allItems.length; i++) {
      totalWithPromo += allItems[i].prixFinal;
    }

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
          <span>{total.toFixed(2)} TND</span>
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
