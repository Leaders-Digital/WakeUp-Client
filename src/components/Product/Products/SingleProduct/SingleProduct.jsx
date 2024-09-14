import Link from 'next/link';

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  const { nom, oldPrice, prix, mainPicture, solde, isNew, id } = product;
  console.log(mainPicture);
  
  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className='products-item'>
        <div className='products-item__type'>
          {solde && <span className='products-item__sale'>sale</span>}
          {isNew && <span className='products-item__new'>new</span>}
        </div>
        <div className='products-item__img'>
          <img src={"http://localhost:7000/"+mainPicture} className='js-img' alt='' />
          <div className='products-item__hover'>
            <Link href={`/product/${id}`}>
              <a>
                <i className='icon-search'></i>
              </a>
            </Link>
            <div className='products-item__hover-options'>
              <button className='addList' onClick={() => onAddToWish(id)}>
                <i className='icon-heart'></i>
              </button>
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? 'added' : ''}`}
                onClick={() => onAddToCart(id)}
              >
                <i className='icon-cart'></i>
              </button>
            </div>
          </div>
        </div>
        <div className='products-item__info'>
          <Link href={`/product/${id}`}>
            <a>
              <span className='products-item__name'>{nom}</span>
            </a>
          </Link>
          <span className='products-item__cost'>
            <span>{oldPrice && `$${oldPrice}`}</span> ${prix}
          </span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
