import productData from 'data/product/product';
import { CartContext, PromoContext } from 'pages/_app';
import { useContext } from 'react';
import { Card } from './Card/Card';

export const CheckoutOrders = ({total}) => {
  const { cart } = useContext(CartContext);
  const { promo } = useContext(PromoContext);


  const totalWithDiscount = promo
  ? total - (total * promo) / 100 // Assuming promo is a percentage
  : total;
  
  const deliveryFee = 8;
  const subtotal = totalWithDiscount + deliveryFee;
  const tva = subtotal * 0.19; // 19% TVA
  const finalTotal = subtotal + tva;
  
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
        <div className='cart-bottom__total-promo'>
          Réduction sur code promo
          <span> {promo ? promo + "%" : "Non"}</span>
        </div>
        <div className='cart-bottom__total-delivery'>
          Livraison{' '}
          <span className='cart-bottom__total-delivery-date'>
            {loadingDate}
          </span>
          <span>8 TND</span>
        </div>
        <div className='cart-bottom__total-tva'>
          TVA (19%)
          <span> {tva.toFixed(2)} TND</span>
        </div>
        <div className='cart-bottom__total-num'>
          total:
          <span> {finalTotal.toFixed(2)} TND </span>
        </div>
      </div>
    </>
  );
};
