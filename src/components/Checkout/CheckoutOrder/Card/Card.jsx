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
    reference
  } = order;

  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${_id}`}>
          <a className='checkout-order__item-img'>
            <img src={"http://localhost:7000/"+mainPicture} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${_id}`}>
            <a className='title6'>
              {nom} <span>x{quantity}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            ${(prix * quantity).toFixed(2)}
          </span>
          <span className='checkout-order__item-num'>SKU: {reference}</span>
        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
