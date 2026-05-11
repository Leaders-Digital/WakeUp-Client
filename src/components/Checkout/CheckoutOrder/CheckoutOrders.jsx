import { CartContext, PromoContext } from 'pages/_app';
import { useContext } from 'react';
import { Card } from './Card/Card';

const SHIPPING_FEE_TND = 8;

export const CheckoutOrders = ({ total }) => {
  const { cart } = useContext(CartContext);
  const { promo } = useContext(PromoContext);

  const totalWithDiscount = promo
    ? total - (total * promo) / 100
    : total;
  const grandTotal = (totalWithDiscount + SHIPPING_FEE_TND).toFixed(2);

  const getLoadingDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 2);
    return futureDate.toLocaleDateString();
  };

  const loadingDate = getLoadingDate();
  return (
    <>
      <div className='checkout-order'>
        <h5>Votre commande</h5>
        {cart.map((order, idx) => (
          <Card key={order.variantId || order._id || idx} order={order} />
        ))}
      </div>
      <div className='cart-bottom__total'>
        <div className='cart-bottom__total-goods'>
          Produits pour
          <span>{Number(total).toFixed(2)} TND</span>
        </div>
        <div className='cart-bottom__total-promo'>
          Réduction CNRPS (indicatif)
          <span>{promo ? `${promo}%` : "Non"}</span>
        </div>
        <div className='cart-bottom__total-delivery'>
          Livraison{' '}
          <span className='cart-bottom__total-delivery-date'>
            {loadingDate}
          </span>
          <span>{SHIPPING_FEE_TND.toFixed(2)} TND</span>
        </div>
        <div className='cart-bottom__total-num'>
          Total :
          <span> {grandTotal} TND</span>
        </div>
      </div>
    </>
  );
};
