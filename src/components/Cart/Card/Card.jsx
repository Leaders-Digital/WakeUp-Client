import Link from "next/link";

export const Card = ({ cart, onChangeQuantity }) => {
  const {
    nom,
    mainPicture,
    _id,
    isStocked,
    codeAbarre,
    prix,
    soldePourcentage,
    solde,
    quantity,
    variantId,
    reference,
  } = cart;
  console.log("from card", cart);

  return (
    <>
      <div className="cart-table__row">
        <div className="cart-table__col">
          <Link href={`/product/${_id}`}>
            <a className="cart-table__img">
              <img
                src={"http://localhost:7000/" + mainPicture}
                className="js-img"
                alt=""
              />
            </a>
          </Link>
          <div className="cart-table__info">
            <Link href={`/product/${_id}`}>
              <a className="title5">{nom}</a>
            </Link>
            {quantity && (
              <span className="cart-table__info-stock">En stock</span>
            )}
            <span className="cart-table__info-num">Référence: {reference}</span>
          </div>
        </div>
        <div className="cart-table__col">
          {solde ? (
            <span className="cart-table__price">
              <span>{prix}TND</span>
              {prix - prix * (soldePourcentage / 100)}TND
            </span>
          ) : (
            <span className="cart-table__price">{prix}TND</span>
          )}
        </div>
        <div className="cart-table__col">
          <div className="cart-table__quantity">
            <div className="counter-box">
              <span
                onClick={() =>
                  onChangeQuantity("decrement", quantity, variantId)
                }
                className="counter-link counter-link__prev"
              >
                <i className="icon-arrow"></i>
              </span>
              <input
                type="text"
                className="counter-input"
                disabled
                value={quantity}
              />
              <span
                onClick={() =>
                  onChangeQuantity("increment", quantity, variantId)
                }
                className="counter-link counter-link__next"
              >
                <i className="icon-arrow"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="cart-table__col">
          <span className="cart-table__total">
            {solde
              ? ((prix - prix * (soldePourcentage / 100)) * quantity).toFixed(2) + " TND" 
              : (prix * quantity).toFixed(2)  + " TND" } 
          </span>
        </div>
      </div>
    </>
  );
};
