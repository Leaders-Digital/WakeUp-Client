import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";
import axios from "axios";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { Reviews } from "../Reviews/Reviews";

export const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const socialLinks = [...socialData];

  const [product, setProduct] = useState({ variants: [] });
  const [addedInCart, setAddedInCart] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const getProduct = async (id) => {
    console.log("fireeeed");
    
    try {
      const res = await axios.get(`http://localhost:7000/api/product/${id}`);
      setProduct(res.data.product);
      console.log("fris tttt", res.data.product.variants[0]);
      setSelectedVariant({ ...res.data.product.variants[0] });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getProduct(router.query.id);
    }
  }, [router.query.id]);

  const handleAddToCart = () => {
    const newProduct = { ...product, quantity: quantity };
    setCart([...cart, newProduct]);
  };
  console.log(selectedVariant);

  console.log("pro", product.retings);
console.log("proiddddddddddd", product._id);

  if (!product) return <></>;
  return (
    <>
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
                  // ref={(slider1) => setNav1(slider1)}
                >
                  <div className="product-slider__main-item">
                    <div className="products-item__type">
                      {product.isSale && (
                        <span className="products-item__sale">sale</span>
                      )}
                      {product.isNew && (
                        <span className="products-item__new">new</span>
                      )}
                    </div>
                    <img
                      src={
                        selectedVariant && selectedVariant.picture
                          ? "http://localhost:7000/" + selectedVariant.picture
                          : "http://localhost:7000/" + product.mainPicture
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
                  {product.variants &&
                    product.variants.map((oneVarient, index) => (
                      <div
                        key={index}
                        className="product-slider__nav-item"
                        onClick={() => setSelectedVariant(oneVarient)}
                      >
                        <img
                          src={"http://localhost:7000/" + oneVarient.picture}
                          alt="product"
                        />
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.nom}</h3>
              {product.quantite > 0 ? (
                <span className="product-stock">in stock</span>
              ) : (
                ""
              )}
              <span className="product-num">SKU: {product.productNumber}</span>
              {product.solde ? (
                <span className="product-price">
                  <span>{product.prix}TND</span>{product.prix}TND
                </span>
              ) : (
                <span className="product-price">{product.prix}TND</span>
              )}
              <p>{product.description}</p>
              <div className="contacts-info__social">
                <span>Find us here:</span>
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
                  <span>Color:</span>
                  <ul>
                    {product?.variants &&
                      product?.variants.map((variant, index) => (
                        <li
                          onClick={() => {
                            setActiveColor(index);
                            setSelectedVariant(variant);
                          }}
                          className={activeColor === index ? "active" : ""}
                          key={index}
                          style={{ backgroundColor: variant.color }}
                        ></li>
                      ))}
                  </ul>
                </div>
                <div className="product-info__quantity">
                  <span className="product-info__quantity-title">
                    Quantity:
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
                      onClick={() => setQuantity(quantity + 1)}
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
                  onClick={() => handleAddToCart()}
                  className="btn btn-icon"
                >
                  <i className="icon-cart"></i> cart
                </button>
                <button className="btn btn-grey btn-icon">
                  <i className="icon-heart"></i> wish
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
                  Reviews
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

                    <ReviewFrom productId={product._id} getProduct={getProduct} productimage={product.mainPicture} />
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