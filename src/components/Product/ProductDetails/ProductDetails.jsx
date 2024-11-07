import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";
import axios from "axios";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { Reviews } from "../Reviews/Reviews";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const socialLinks = [...socialData];

  const [product, setProduct] = useState({ variants: [] });
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [addedInCart, setAddedInCart] = useState(false);
  console.log(product);
  console.log(selectedVariant);

  const getProduct = async (id) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/${id}`, // Data being sent in the body of the request
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );
      setProduct(res.data);
      setSelectedVariant({ ...res.data.variants[0] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getProduct(router.query.id);
    }
  }, [router.query.id]);

  const handleditection = (id) => {
    if (selectedVariant) {
      const variantExistsInCart = cart.some((item) => item.variantId === id);
      return variantExistsInCart;
    }
  };

  const handleAddToCart = () => {
    // Check if the selected variant is already in the cart
    const theId = { ...selectedVariant };
    const variantExistsInCart = handleditection(theId._id);
    if (variantExistsInCart)
      return toast.error("Le produit existe déjà dans votre panier"); // If the variant is already in the cart, return
    let newProduct = {};
    if (product.categorie === "PACK") {
      newProduct = {
        nom: product.nom,
        prix: product.prix,
        mainPicture: product.mainPicture,
        quantity: quantity,
        stock: 3,
        reference: "package",
        categorie: product.categorie,
        _id: product._id,
        solde: product.solde,
        soldePourcentage: product.solde,
      };
    } else {
      newProduct = {
        nom: product.nom,
        prix: product.prix,
        mainPicture: selectedVariant.picture,
        codeAbarre: selectedVariant.codeAbarre,
        reference: selectedVariant.reference,
        _id: product._id,
        quantity: quantity,
        variantId: selectedVariant._id,
        solde: product.solde,
        stock: selectedVariant.quantity,
        soldePourcentage: product.soldePourcentage,
      };
    }
    setCart([...cart, newProduct]); // Add the new product to the cart
    return toast.success("Produit ajouté avec succès");
  };

  if (!product)
    return (
      <div style={{ minHeight: "60vh", marginTop: "10rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span class="loader"></span>
        </div>
      </div>
    );
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
                      {product.isSale && (
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
                          ? `${process.env.NEXT_PUBLIC_API_KEY}` +
                            selectedVariant.picture
                          : `${process.env.NEXT_PUBLIC_API_KEY}` +
                            product.mainPicture
                      }
                      alt="product"
                    />
                  </div>
                </Slider>
              </div>

              <div className="product-slider__nav">
                <Slider
                  arrows={false}
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={product.variants.length}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {product.variants.length > 1 &&
                    product.variants.map((oneVarient, index) => (
                      <div
                        key={index}
                        className="product-slider__nav-item"
                        onClick={() => setSelectedVariant(oneVarient)}
                      >
                        <img
                          src={
                            `${process.env.NEXT_PUBLIC_API_KEY}` +
                            oneVarient.picture
                          }
                          alt="product"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.nom}</h3>
              {product.quantite > 0 ? (
                <span className="product-stock">En stock</span>
              ) : (
                ""
              )}
              <span className="product-num">
                {selectedVariant?.reference
                  ? "Reference " + selectedVariant.reference
                  : ""}
              </span>
              {product.solde ? (
                <span className="product-price">
                  <span>{product.prix} TND</span>
                  {product.prix -
                    product.prix * (product.soldePourcentage / 100)}
                  TND
                </span>
              ) : (
                <span className="product-price">{product.prix} TND</span>
              )}
              <p>{product.description}</p>
              <div className="contacts-info__social">
                <span>Retrouvez-nous ici :</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path}>
                        <i className={social.icon ? social.icon : ""}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="product-options">
                <div className="product-info__color">
                  {product?.variants.length ? <span>Couleur :</span> : null}
                  <ul>
                    {product?.variants &&
                      product?.variants
                        .filter((variant) => variant.quantity > 0) // Filter out variants with zero quantity
                        .map((variant, index) => (
                          <li
                            onClick={() => {
                              if (variant.quantity > 0) {
                                setSelectedVariant(variant);
                                handleditection(variant._id);
                                setActiveColor(index);
                                setQuantity(1);
                              }
                            }}
                            className={activeColor === index ? "active" : ""}
                            key={index}
                            style={{
                              backgroundColor: variant.color,
                              opacity: variant.quantity ? "1" : "0.8",
                              position: "relative", // Add this for the absolute "X"
                            }}
                          >
                            {/* Additional content can go here */}
                          </li>
                        ))}
                  </ul>
                </div>

                <div className="product-info__quantity">
                  <span className="product-info__quantity-title">
                    Quantité :
                  </span>
                  <div className="counter-box">
                    <span
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
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
                        quantity < selectedVariant.quantity &&
                        setQuantity(quantity + 1)
                      }
                      className="counter-link counter-link__next"
                    >
                      <i className="icon-arrow"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-buttons">
                <button
                  disabled={addedInCart}
                  onClick={() => {
                    handleAddToCart();
                    setQuantity(1);
                  }}
                  className="btn btn-icon"
                  style={{ textTransform: "capitalize" }}
                >
                  Panier
                  <i 
                    class="icon-cart"
                    style={{ marginLeft: "10px" }}
                  ></i>
                </button>
                <button
                  className="btn btn-icon"
                  style={{ background: "#25D366", textTransform: "capitalize" }}
                  onClick={() => {
                    const produitLien = window.location.href;
                    const numero = "+21626644400"; // Remplacez par votre numéro de téléphone
                    const texte = encodeURIComponent(
                      `Bonjour, je suis intéressé par ce produit: ${produitLien}`
                    );
                    const lienWhatsApp = `https://api.whatsapp.com/send?phone=${numero}&text=${texte}`;
                    window.open(lienWhatsApp, "_blank");
                  }}
                >
                  Commander par WhatsApp
                  <i
                    className="icon-whatsapp"
                    style={{ marginLeft: "10px" }}
                  ></i>
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
                    {product.retings && <Reviews reviews={product.retings} />}
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
