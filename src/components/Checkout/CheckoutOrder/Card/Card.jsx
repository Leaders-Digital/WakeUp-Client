import Link from 'next/link';

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
? prix - prix * (soldePourcentage / 100)
: prix;
  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${_id}`}>
          <a className='checkout-order__item-img'>
            <img src={`${process.env.NEXT_PUBLIC_API_KEY}`+mainPicture} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${_id}`}>
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
