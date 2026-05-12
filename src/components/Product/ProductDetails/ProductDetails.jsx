import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { getImageUrl } from "utils/imageUrl";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { Reviews } from "../Reviews/Reviews";

const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const [product, setProduct] = useState({ variants: [] });
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [loading, setLoading] = useState(true);

  const getProduct = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/${id}`,
        {
          headers: { "x-api-key": process.env.NEXT_PUBLIC_KEY },
        }
      );
      setProduct(res.data);
      setQuantity(1);
      if (res.data.variants && res.data.variants.length > 0) {
        setSelectedVariant({ ...res.data.variants[0] });
      }
      setLoading(false);

      if (res.data.handle && router.query.id === res.data._id) {
        router.replace(`/product/${res.data.handle}`, undefined, {
          shallow: true,
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      setLoading(true);
      getProduct(router.query.id);
    }
  }, [router.query.id]);

  const handleAddToCart = () => {
    const linePackStock = Math.max(
      0,
      Math.floor(Number(product.quantite ?? 0)) || 0
    );

    if (product.categorie === "PACK") {
      const packInCart = cart.some(
        (item) => item.categorie === "PACK" && item._id === product._id
      );
      if (packInCart) {
        return toast.error("Le produit existe déjà dans votre panier");
      }
      if (quantity > linePackStock) {
        return toast.error("Quantité non disponible en stock");
      }
    } else if (selectedVariant) {
      const variantExistsInCart = cart.some(
        (item) => item.variantId === selectedVariant._id
      );
      if (variantExistsInCart) {
        return toast.error("Le produit existe déjà dans votre panier");
      }
    }

    let newProduct;
    if (product.categorie === "PACK") {
      newProduct = {
        nom: product.nom,
        prix: product.prix,
        mainPicture: product.mainPicture,
        quantity,
        stock: linePackStock,
        reference: "package",
        categorie: product.categorie,
        _id: product._id,
        solde: product.solde,
        soldePourcentage: product.soldePourcentage,
      };
    } else {
      newProduct = {
        nom: product.nom,
        prix: product.prix,
        mainPicture: selectedVariant.picture,
        codeAbarre: selectedVariant.codeAbarre,
        reference: selectedVariant.reference,
        _id: product._id,
        quantity,
        variantId: selectedVariant._id,
        solde: product.solde,
        stock: selectedVariant.quantity,
        soldePourcentage: product.soldePourcentage,
      };
    }
    setCart([...cart, newProduct]);
    toast.success("Produit ajouté à votre panier");
  };

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      const produitLien = window.location.href;
      const numero = "+21627246374";
      const texte = encodeURIComponent(
        `Bonjour, je suis intéressé par ce produit: ${produitLien}`
      );
      const lienWhatsApp = `https://api.whatsapp.com/send?phone=${numero}&text=${texte}`;
      window.open(lienWhatsApp, "_blank", "noopener,noreferrer");
    }
  };

  if (loading || !product || !product.nom) {
    return (
      <div style={{ minHeight: "60vh", marginTop: "10rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span className="loader" aria-label="Chargement"></span>
        </div>
      </div>
    );
  }

  const displayedPrice = product.solde
    ? (product.prix - product.prix * (product.soldePourcentage / 100)).toFixed(2)
    : Number(product.prix).toFixed(2);

  const packStock = Math.max(
    0,
    Math.floor(Number(product.quantite ?? 0)) || 0
  );

  const productImageAlt = product.nom
    ? `${product.nom}${
        selectedVariant?.reference ? ` — ${selectedVariant.reference}` : ""
      }`
    : "Produit Wakeup Cosmetics";

  return (
    <>
      <Toaster position="top-center" />

      <div className="product">
        <div className="wrapper">
          <div className="product-content">
            <div className="product-slider">
              <div className="product-slider__main">
                <Slider
                  fade={true}
                  asNavFor={nav2}
                  arrows={false}
                  lazyLoad={true}
                >
                  <div className="product-slider__main-item">
                    <div className="products-item__type">
                      {product.solde && (
                        <span className="products-item__sale">En solde</span>
                      )}
                      {product.isNew && (
                        <span className="products-item__new">Nouveau</span>
                      )}
                    </div>
                    <img
                      style={{ objectFit: "contain" }}
                      src={
                        selectedVariant && selectedVariant.picture
                          ? getImageUrl(selectedVariant.picture)
                          : getImageUrl(product.mainPicture)
                      }
                      alt={productImageAlt}
                    />
                  </div>
                </Slider>
              </div>

              {product.variants && product.variants.length > 1 && (
                <div className="product-slider__nav">
                  <Slider
                    arrows={false}
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={Math.min(product.variants.length, 4)}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {product.variants.map((oneVariant, index) => (
                      <div
                        key={oneVariant._id || index}
                        className="product-slider__nav-item"
                        onClick={() => {
                          setSelectedVariant(oneVariant);
                          setActiveColor(index);
                        }}
                      >
                        <img
                          src={getImageUrl(oneVariant.picture)}
                          alt={`${product.nom} - variante ${
                            oneVariant.reference || index + 1
                          }`}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
            <div className="product-info">
              <h3>{product.nom}</h3>
              {product.categorie === "PACK" ? (
                packStock > 0 ? (
                  <span className="product-stock">En stock</span>
                ) : (
                  <span
                    className="product-stock"
                    style={{ color: "#d93025" }}
                  >
                    Rupture de stock
                  </span>
                )
              ) : selectedVariant && selectedVariant.quantity > 0 ? (
                <span className="product-stock">En stock</span>
              ) : (
                <span
                  className="product-stock"
                  style={{ color: "#d93025" }}
                >
                  Rupture de stock
                </span>
              )}
              <span className="product-num">
                {product.categorie === "PACK"
                  ? "Référence pack"
                  : selectedVariant?.reference
                  ? "Référence " + selectedVariant.reference
                  : ""}
              </span>
              {product.solde ? (
                <span className="product-price">
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#999",
                      marginRight: 8,
                    }}
                  >
                    {Number(product.prix).toFixed(2)} TND
                  </span>
                  {displayedPrice} TND
                </span>
              ) : (
                <span className="product-price">
                  {displayedPrice} TND
                </span>
              )}
              <p>{product.description}</p>

              {product.categorie === "PACK" && (
                <div className="product-info__quantity" style={{ marginTop: 16 }}>
                  <span className="product-info__quantity-title">
                    Quantité :
                  </span>
                  <div className="counter-box">
                    <button
                      type="button"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                      aria-label="Diminuer la quantité"
                      className="counter-link counter-link__prev"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i className="icon-arrow" aria-hidden="true"></i>
                    </button>
                    <input
                      type="text"
                      className="counter-input"
                      disabled
                      aria-label="Quantité"
                      value={quantity}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (quantity < packStock) setQuantity(quantity + 1);
                      }}
                      aria-label="Augmenter la quantité"
                      className="counter-link counter-link__next"
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <i className="icon-arrow" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Shipping & return reassurance directly on PDP */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  marginTop: 16,
                  marginBottom: 16,
                  fontSize: 14,
                  color: "#555",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <li>Livraison sous 24-48h en Tunisie (8 TND)</li>
                <li>Paiement à la livraison disponible</li>
                <li>Retours acceptés sous 7 jours</li>
              </ul>

              {product.variants && product.variants.length > 0 && (
                <div className="product-options">
                  <div className="product-info__color">
                    <span>
                      Couleur :{" "}
                      {selectedVariant?.reference && (
                        <strong style={{ marginLeft: 6, fontWeight: 600 }}>
                          {selectedVariant.reference}
                        </strong>
                      )}
                    </span>
                    <ul
                      style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        padding: 0,
                        marginTop: 8,
                      }}
                    >
                      {product.variants.map((variant, index) => {
                        const isOutOfStock =
                          !variant.quantity || variant.quantity <= 0;
                        return (
                          <li
                            key={variant._id || index}
                            onClick={() => {
                              if (isOutOfStock) return;
                              setSelectedVariant(variant);
                              setActiveColor(index);
                              setQuantity(1);
                            }}
                            title={
                              isOutOfStock
                                ? `${variant.reference || "Variante"} — Rupture de stock`
                                : variant.reference || "Variante"
                            }
                            aria-label={`${
                              variant.reference || "Variante"
                            }${isOutOfStock ? " - épuisé" : ""}`}
                            className={activeColor === index ? "active" : ""}
                            style={{
                              backgroundColor: variant.color || "#ddd",
                              opacity: isOutOfStock ? 0.35 : 1,
                              cursor: isOutOfStock ? "not-allowed" : "pointer",
                              position: "relative",
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              border:
                                activeColor === index
                                  ? "2px solid #D47E00"
                                  : "1px solid #ddd",
                              listStyle: "none",
                            }}
                          >
                            {isOutOfStock && (
                              <span
                                style={{
                                  position: "absolute",
                                  inset: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 18,
                                  color: "#333",
                                  fontWeight: 700,
                                }}
                              >
                                ×
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="product-info__quantity">
                    <span className="product-info__quantity-title">
                      Quantité :
                    </span>
                    <div className="counter-box">
                      <button
                        type="button"
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1);
                        }}
                        aria-label="Diminuer la quantité"
                        className="counter-link counter-link__prev"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <i className="icon-arrow" aria-hidden="true"></i>
                      </button>
                      <input
                        type="text"
                        className="counter-input"
                        disabled
                        aria-label="Quantité"
                        value={quantity}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            selectedVariant &&
                            quantity < selectedVariant.quantity
                          ) {
                            setQuantity(quantity + 1);
                          }
                        }}
                        aria-label="Augmenter la quantité"
                        className="counter-link counter-link__next"
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <i className="icon-arrow" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div
                className="product-buttons"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  marginTop: 24,
                }}
              >
                <button
                  type="button"
                  disabled={product.enRupture}
                  onClick={() => {
                    handleAddToCart();
                    setQuantity(1);
                  }}
                  className="btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    height: "auto",
                    minHeight: 52,
                    lineHeight: 1.2,
                    padding: "14px 28px",
                    fontSize: 15,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    opacity: product.enRupture ? 0.7 : 1,
                    cursor: product.enRupture ? "not-allowed" : "pointer",
                    flex: "1 1 220px",
                  }}
                >
                  <span>Ajouter au panier</span>
                  <i
                    className="icon-cart"
                    style={{ fontSize: 18, margin: 0 }}
                    aria-hidden="true"
                  ></i>
                </button>
                <button
                  type="button"
                  disabled={product.enRupture}
                  className="btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    height: "auto",
                    minHeight: 52,
                    lineHeight: 1.2,
                    padding: "14px 24px",
                    fontSize: 14,
                    textTransform: "none",
                    whiteSpace: "nowrap",
                    background: "#25D366",
                    opacity: product.enRupture ? 0.7 : 1,
                    cursor: product.enRupture ? "not-allowed" : "pointer",
                    flex: "1 1 220px",
                  }}
                  onClick={handleWhatsAppClick}
                  aria-label="Commander par WhatsApp"
                >
                  <i
                    className="fab fa-whatsapp"
                    style={{ fontSize: 18, margin: 0 }}
                    aria-hidden="true"
                  ></i>
                  <span>Commander sur WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          <div className="product-detail">
            <div className="tab-wrap product-detail-tabs">
              <ul className="nav-tab-list tabs pd-tab">
                <li
                  className={tab === 1 ? "active" : ""}
                  onClick={() => setTab(1)}
                >
                  Description
                </li>
                <li
                  className={tab === 2 ? "active" : ""}
                  onClick={() => setTab(2)}
                >
                  Avis
                  {product.retings && product.retings.length > 0 && (
                    <span style={{ marginLeft: 6 }}>
                      ({product.retings.length})
                    </span>
                  )}
                </li>
              </ul>
              <div className="box-tab-cont">
                {tab === 1 && (
                  <div className="tab-cont">
                    <p>{product.description}</p>
                  </div>
                )}
                {tab === 2 && (
                  <div className="tab-cont product-reviews">
                    {product.retings && product.retings.length > 0 ? (
                      <Reviews
                        reviews={product.retings.filter(
                          (r) => r && r.accepted !== false
                        )}
                      />
                    ) : (
                      <p style={{ color: "#666", marginBottom: 24 }}>
                        Soyez le premier à donner votre avis sur ce produit.
                      </p>
                    )}
                    <ReviewFrom
                      productId={product._id}
                      getProduct={getProduct}
                      productimage={product.mainPicture}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
