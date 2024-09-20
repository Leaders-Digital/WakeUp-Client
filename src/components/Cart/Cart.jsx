import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const socialLinks = [...socialData];

  const total = cart.reduce((total, item) => {
    const prixFinal = item.solde
      ? item.prix - item.prix * (item.soldePourcentage / 100)
      : item.prix;

    return total + Number(prixFinal) * Number(item.quantity);
  }, 0);

  console.log("cart", cart);

  const handleProductQuantity = (change, quantity, id) => {
    console.log(change, quantity, id);
    if (change === "increment") {
      cart.find((item) => item.variantId === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === "decrement" && quantity > 1) {
      cart.find((item) => item.variantId === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count]);

  return (
    <>
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
                </div>

                {cart.map((cart) => (
                  <Card
                    onChangeQuantity={(change, quantity) =>
                      handleProductQuantity(change, quantity, cart.variantId)
                    }
                    key={cart.id}
                    cart={cart}
                  />
                ))}
              </div>
            </div>
            <div className="cart-bottom">
              <div className="cart-bottom__promo">
                <form className="cart-bottom__promo-form">
                  <div className="box-field__row">
                    <div className="box-field">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Entrez le code promo"
                      />
                    </div>
                    <button type="submit" className="btn btn-grey">
                      appliquer
                    </button>
                  </div>
                </form>
                <h6>Comment obtenir un code promo ?</h6>
                <p>
                  Suivez nos actualités sur le site, ainsi que abonnez-vous à nos
                  réseaux sociaux. Vous pourrez ainsi recevoir des codes à jour et
                  être informé des nouveaux produits et articles promotionnels.
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
                  <span>Non</span>
                </div>
                <div className="cart-bottom__total-num">
                  total :
                  <span>{total.toFixed(2)} TND</span>
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
