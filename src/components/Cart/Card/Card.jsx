import Link from "next/link";
import { getImageUrl } from "utils/imageUrl";
import { getProductUrl } from "utils/productUrl";

export const Card = ({ cart, onChangeQuantity, handleDelete, lineId }) => {
  const {
    nom,
    mainPicture,
    _id,
    prix,
    soldePourcentage,
    solde,
    quantity,
    variantId,
    reference,
    stock,
  } = cart;
  // Use the explicit lineId when provided (handles PACK items that have no variantId),
  // fall back to legacy variantId for safety.
  const effectiveLineId = lineId || variantId || _id;
  return (
    <>
      <div className="cart-table__row">
        <div className="cart-table__col">
          <Link href={getProductUrl(cart)}>
            <a className="cart-table__img">
              <img
                src={getImageUrl(mainPicture)}
                className="js-img"
                alt={nom || "Produit"}
                style={{
                  objectFit: "contain",
                  width: "100px",
                  height: "100px",
                }}
              />
            </a>
          </Link>
          <div className="cart-table__info">
            <Link href={getProductUrl(cart)}>
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
              {(prix - prix * (soldePourcentage / 100)).toFixed(2)}TND
            </span>
          ) : (
            <span className="cart-table__price">{prix}TND</span>
          )}
        </div>
        <div className="cart-table__col">
          <div className="cart-table__quantity">
            <div className="counter-box">
              <button
                type="button"
                onClick={() =>
                  onChangeQuantity("decrement", quantity, effectiveLineId, stock)
                }
                aria-label="Diminuer la quantité"
                className="counter-link counter-link__prev"
                style={{ background: "transparent", border: "none" }}
              >
                <i className="icon-arrow" aria-hidden="true"></i>
              </button>
              <input
                type="text"
                className="counter-input"
                disabled
                aria-label={`Quantité de ${nom}`}
                value={quantity}
              />
              <button
                type="button"
                onClick={() =>
                  onChangeQuantity("increment", quantity, effectiveLineId, stock)
                }
                aria-label="Augmenter la quantité"
                className="counter-link counter-link__next"
                style={{ background: "transparent", border: "none" }}
              >
                <i className="icon-arrow" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="cart-table__col">
          <span className="cart-table__total">
            {solde
              ? (((prix - prix * (soldePourcentage / 100)) * quantity).toFixed(2) + " TND")
              : (prix * quantity).toFixed(2) + " TND"}
          </span>
        </div>
        <div className="cart-table__col">
          <button
            type="button"
            onClick={() => handleDelete(effectiveLineId)}
            aria-label={`Retirer ${nom} du panier`}
            className="cart-table__delete"
            style={{
              cursor: "pointer",
              color: "red",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              marginLeft: "30px",
              padding: 0,
            }}
          >
            <svg
              className="icon-trash"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              aria-hidden="true"
            >
              <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
