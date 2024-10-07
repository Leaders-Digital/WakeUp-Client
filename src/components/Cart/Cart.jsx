import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext, PromoContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { promo, setPromo } = useContext(PromoContext);

  const [count, setCount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
  const socialLinks = [...socialData];

  const total = cart.reduce((total, item) => {
    const prixFinal = item.solde
      ? item.prix - item.prix * (item.soldePourcentage / 100)
      : item.prix;

    return total + Number(prixFinal) * Number(item.quantity);
  }, 0);
  const totalWithDiscount = promo
    ? total - (total * promo) / 100 // Assuming promo is a percentage
    : total;

  const handleProductQuantity = (change, quantity, id, stock) => {
    if (change === "increment" && quantity < stock) {
      cart.find((item) => item.variantId === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === "decrement" && quantity > 1) {
      cart.find((item) => item.variantId === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.variantId !== id);
    setCart(updatedCart); // Update cart in context
    setCount(count + 1); // Trigger re-render
  };

  const handlePromo = async () => {
    setLoadingCode(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/promo/applyPromoCode`,
        { code: promoCode }
      );
      setLoadingCode(false);
      setPromo(res.data.discountValue);
      toast.success("Code promo appliqué avec succès");
    } catch (error) {
      setLoadingCode(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count]);

  return (
    <>
      <Toaster />
      {cart.length === 0 ? (
        <div
          style={{ minHeight: "50vh", textAlign: "center", marginTop: "60px" }}
        >
          <h3>Aucun produit dans votre panier</h3>

          <Link href="/shop">
            <a className="btn" style={{ marginTop: "30px" }}>
              Commencez vos achats
            </a>
          </Link>
        </div>
      ) : (
        <div className="cart">
          <div className="wrapper">
            <div className="cart-table">
              <div className="cart-table__box">
                <div className="cart-table__row cart-table__row-head">
                  <div className="cart-table__col">Produit</div>
                  <div className="cart-table__col">Prix</div>
                  <div className="cart-table__col">Quantité</div>
                  <div className="cart-table__col">Total</div>
                  <div className="cart-table__col"></div>
                </div>

                {cart.map((cart) => (
                  <Card
                    onChangeQuantity={(change, quantity) =>
                      handleProductQuantity(
                        change,
                        quantity,
                        cart.variantId,
                        cart.stock
                      )
                    }
                    key={cart.id}
                    handleDelete={handleDelete}
                    cart={cart}
                  />
                ))}
              </div>
            </div>
            <div className="cart-bottom">
              <div className="cart-bottom__promo">
                <div
                  className="box-field__row"
                  style={{ marginBottom: "30px" }}
                >
                  <div className="box-field">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Entrez le code promo"
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-grey" onClick={handlePromo}>
                    {loadingCode ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          class="spinner"
                          style={{ width: "20px", height: "20px" }}
                        ></div>
                      </div>
                    ) : (
                      "Appliquer"
                    )}
                  </button>
                </div>

                <h6>Comment obtenir un code promo ?</h6>
                <p>
                  Suivez nos actualités sur le site, ainsi que abonnez-vous à
                  nos réseaux sociaux. Vous pourrez ainsi recevoir des codes à
                  jour et être informé des nouveaux produits et articles
                  promotionnels.
                </p>
                <div className="contacts-info__social">
                  <span>Trouvez-nous ici :</span>
                  <ul>
                    {socialLinks.map((social, index) => (
                      <li key={index}>
                        <a href={social.path} target="_blank">
                          <i className={social.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="cart-bottom__total">
                <div className="cart-bottom__total-goods">
                  Produits pour
                  <span>{total.toFixed(2)} TND</span>
                </div>
                <div className="cart-bottom__total-promo">
                  Remise sur le code promo
                  <span> {promo ? promo + "%" : "Non"}</span>
                </div>
                <div className="cart-bottom__total-num">
                  total :
                  <span>
                    {promo ? totalWithDiscount : total.toFixed(2)} TND
                  </span>
                </div>
                <Link href="/checkout">
                  <a className="btn">Passer à la caisse</a>
                </Link>
              </div>
            </div>
          </div>
          <img
            className="promo-video__decor js-img"
            src="assets/img/promo-video__decor.jpg"
            alt=""
          />
        </div>
      )}
    </>
  );
};
