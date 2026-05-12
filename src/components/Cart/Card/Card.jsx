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

  const effectiveLineId = lineId || variantId || _id;

  const unitFinal = solde
    ? prix - prix * (soldePourcentage / 100)
    : Number(prix);
  const lineTotal = unitFinal * Number(quantity);

  return (
    <div className="cart-table__row cart-line">
      <div className="cart-line__section cart-line__section--product">
        <div className="cart-line__product-main">
          <Link href={getProductUrl(cart)}>
            <a className="cart-line__thumb">
              <img
                src={getImageUrl(mainPicture)}
                className="cart-line__thumb-img js-img"
                alt={nom || "Produit"}
              />
            </a>
          </Link>
          <div className="cart-line__info">
            <Link href={getProductUrl(cart)}>
              <a className="title5 cart-line__title">{nom}</a>
            </Link>
            {quantity ? (
              <span className="cart-table__info-stock">En stock</span>
            ) : null}
            <span className="cart-line__ref">
              Référence : {reference || "—"}
            </span>
          </div>
        </div>
      </div>

      <div className="cart-line__section cart-line__section--price">
        <span className="cart-line__field-label">Prix</span>
        <div className="cart-line__price-value cart-table__price">
          {solde ? (
            <>
              <span>{prix} TND</span>
              {unitFinal.toFixed(2)} TND
            </>
          ) : (
            <>{Number(prix).toFixed(2)} TND</>
          )}
        </div>
      </div>

      <div className="cart-line__section cart-line__section--qty">
        <span className="cart-line__field-label">Quantité</span>
        <div className="cart-table__quantity cart-line__quantity">
          <div className="counter-box cart-line__counter">
            <button
              type="button"
              onClick={() =>
                onChangeQuantity("decrement", quantity, effectiveLineId, stock)
              }
              aria-label="Diminuer la quantité"
              className="counter-link counter-link__prev cart-line__counter-btn"
            >
              <i className="icon-arrow" aria-hidden="true"></i>
            </button>
            <input
              type="text"
              className="counter-input"
              disabled
              readOnly
              aria-label={`Quantité de ${nom}`}
              value={quantity}
            />
            <button
              type="button"
              onClick={() =>
                onChangeQuantity("increment", quantity, effectiveLineId, stock)
              }
              aria-label="Augmenter la quantité"
              className="counter-link counter-link__next cart-line__counter-btn"
            >
              <i className="icon-arrow" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="cart-line__section cart-line__section--total">
        <span className="cart-line__field-label">Sous-total</span>
        <span className="cart-table__total cart-line__subtotal">
          {lineTotal.toFixed(2)} TND
        </span>
      </div>

      <div className="cart-line__section cart-line__section--remove">
        <button
          type="button"
          onClick={() => handleDelete(effectiveLineId)}
          aria-label={`Retirer ${nom} du panier`}
          className="cart-table__delete cart-line__remove-btn"
        >
          <svg
            className="cart-line__remove-icon"
            width={20}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            aria-hidden="true"
          >
            <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
          </svg>
          <span className="cart-line__remove-text">Retirer</span>
        </button>
      </div>
    </div>
  );
};
