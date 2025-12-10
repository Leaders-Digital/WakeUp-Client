import Link from 'next/link';
import { getImageUrl } from 'utils/imageUrl';
import { getProductUrl } from 'utils/productUrl';

export const Card = ({ order }) => {
  const {
    nom,
    mainPicture,
    _id,
    isStocked,
    productNumber,
    prix,
    quantity,
    variantId,
    reference,
    solde,
    soldePourcentage,
  } = order;
const prixFinal = solde
? (prix - prix * (soldePourcentage / 100)).toFixed(2)
: prix.toFixed(2);
  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={getProductUrl(order)}>
          <a className='checkout-order__item-img'>
            <img src={getImageUrl(mainPicture)} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={getProductUrl(order)}>
            <a className='title6'>
              {nom} <span>x{quantity}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            {(prixFinal * quantity).toFixed(2)} TND
          </span>
          <span className='checkout-order__item-num'>reference : {reference}</span>
        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
