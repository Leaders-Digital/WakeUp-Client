import Link from "next/link";

export const SingleProduct = ({
  product,
  onAddToWish,
  onAddToCart,
  addedInCart,
}) => {
  const { nom, soldePourcentage, prix, mainPicture, solde, createdAt, _id } =
    product;

  const isNew = () => {
    const currentDate = new Date();
    const productDate = new Date(createdAt);
    const diffTime = Math.abs(currentDate - productDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
    return diffDays <= 30; // Consider "new" if within the last 30 days
  };

  return (
    <>
      {/* <!-- BEING SINGLE PRODUCT ITEM --> */}
      <div className="products-item">
        <div className="products-item__type">
          {solde && <span className="products-item__sale">sale</span>}
          {isNew() && <span className="products-item__new">new</span>}
        </div>
        <div className="products-item__img">
          <img
            src={"http://localhost:7000/" + mainPicture}
            className="js-img"
            style={{objectFit: "contain"}}
            alt=""
          />
          <div className="products-item__hover">
            <Link href={`/product/${_id}`}>
              <a>
                <i className="icon-search"></i>
              </a>
            </Link>
            <div className="products-item__hover-options">
              {/* <button className="addList" onClick={() => onAddToWish(id)}>
                <i className="icon-heart"></i>
              </button> */}
              <button
                disabled={addedInCart}
                className={`addList ${addedInCart ? "added" : ""}`}
                onClick={() =>
                  onAddToCart({
                    nom: product.nom,
                    prix,
                    solde,
                    soldePourcentage,
                    mainPicture: product.variants[0].picture,
                    quantity: 1,
                    codeAbarre: product.variants[0].codeAbarre,
                    reference: product.variants[0].reference,
                    variantId: product.variants[0]._id,
                    _id,
                  })
                }
              >
                <i className="icon-cart"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="products-item__info">
          <Link href={`/product/${product._id}`}>
            <a>
              <span className="products-item__name">{nom}</span>
            </a>
          </Link>
          <span className="products-item__cost">
            <span>{solde && `$${prix}`}</span> TND{" "}
            {prix - prix * (soldePourcentage / 100)}
          </span>
        </div>
      </div>
      {/* <!-- SINGLE PRODUCT ITEM EOF --> */}
    </>
  );
};
