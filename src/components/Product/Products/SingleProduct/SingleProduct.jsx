import { useState } from "react";
import Link from "next/link";
import { getImageUrl } from "utils/imageUrl";
import { getProductUrl } from "utils/productUrl";

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  const {
    nom,
    soldePourcentage,
    prix,
    mainPicture,
    solde,
    createdAt,
    _id,
    categorie,
    enRupture,
    variantDetails = [],
  } = product;

  const [isHovered, setIsHovered] = useState(false);

  const isNew = () => {
    const currentDate = new Date();
    const productDate = new Date(createdAt);
    const diffTime = Math.abs(currentDate - productDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
    return diffDays <= 30; // Consider "new" if within the last 30 days
  };

  return (
    <>
      {/* <!-- BEGIN SINGLE PRODUCT ITEM --> */}
      {/* <Link href={`/product/${_id}`}> */}
        <div
          className="products-item"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="products-item__type">
            {solde && <span className="products-item__sale">Promo</span>}
            {enRupture && (
              <span className="products-item__new">Rupture de stock</span>
            )}
          </div>
          <div className="products-item__img">
            <img
              src={
                isHovered && variantDetails.length > 0
                  ? getImageUrl(variantDetails[0].icon)
                  : getImageUrl(mainPicture)
              }
              className="js-img"
              style={{ objectFit: "contain" }}
              alt=""
            />
            <div className="products-item__hover">
              <Link href={getProductUrl(product)}>
                <a>
                  <i className="icon-search"></i>
                </a>
              </Link>
              {!enRupture ? (
                <div className="products-item__hover-options">
                  {/* <button className="addList" onClick={() => onAddToWish(id)}>
                <i className="icon-heart"></i>
              </button> */}
                  <button
                    disabled={addedInCart}
                    className={`addList ${addedInCart ? "added" : ""}`}
                    onClick={() => {
                      if (categorie === "PACK") {
                        onAddToCart({
                          nom: product.nom,
                          prix,
                          solde,
                          soldePourcentage,
                          mainPicture,
                          quantity: 1,
                          stock: 3,
                          reference: "package",
                          categorie,
                          _id,
                        });
                      } else {
                        onAddToCart({
                          nom: product.nom,
                          prix,
                          solde,
                          stock: variantDetails[0].quantity,
                          soldePourcentage,
                          mainPicture: variantDetails[0].picture,
                          quantity: 1,
                          categorie,
                          codeAbarre: variantDetails[0].codeAbarre,
                          reference: variantDetails[0].reference,
                          variantId: variantDetails[0]._id,
                          _id,
                        });
                      }
                    }}
                  >
                    <i className="icon-cart"></i>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="products-item__info">
            <Link href={getProductUrl(product)}>
              <a>
                <span className="products-item__name">{nom}</span>
              </a>
            </Link>
            <span className="products-item__cost">
              <span>{solde && `TND${prix}`}</span>
              {(prix - prix * (soldePourcentage / 100)).toFixed(2)} TND
            </span>
          </div>
        </div>
        {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
      {/* </Link> */}
    </>
  );
};
