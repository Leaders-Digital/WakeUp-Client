import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext, PromoContext } from "pages/_app";
import { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// Flat shipping fee. Kept in sync with server (SHIPPING_FEE_TND env var).
const SHIPPING_FEE_TND = 8;

// Returns a stable identifier for a cart line: variantId for variants, _id for packs.
const lineKey = (item) => item.variantId || item._id;

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const {
    promo,
    setPromo,
    cnrpsCode,
    setCnrpsCode,
    cnrpsOptions,
    setCnrpsOptions,
    cnrpsPurchaseType,
    setCnrpsPurchaseType,
  } = useContext(PromoContext);

  const [cnrpsInput, setCnrpsInput] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
  const socialLinks = [...socialData];

  const total = cart.reduce((total, item) => {
    const prixFinal = item.solde
      ? (item.prix - item.prix * (item.soldePourcentage / 100)).toFixed(2)
      : item.prix;

    return total + Number(prixFinal) * Number(item.quantity);
  }, 0);
  const totalWithDiscount = promo ? total - (total * promo) / 100 : total;
  const grandTotal = (totalWithDiscount + SHIPPING_FEE_TND).toFixed(2);

  const handleProductQuantity = (change, quantity, id, stock) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (lineKey(item) !== id) return item;
        if (change === "increment" && quantity < stock) {
          return { ...item, quantity: quantity + 1 };
        }
        if (change === "decrement" && quantity > 1) {
          return { ...item, quantity: quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleDelete = (id) => {
    setCart((prevCart) => prevCart.filter((item) => lineKey(item) !== id));
  };

  const resetCnrpsState = () => {
    setPromo(null);
    setCnrpsCode(null);
    setCnrpsOptions([]);
    setCnrpsPurchaseType(null);
  };

  const handleCnrps = async () => {
    setLoadingCode(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/cnrps/validate`,
        { cnrps: cnrpsInput },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY,
          },
        }
      );
      setLoadingCode(false);
      setCnrpsCode(res.data.cnrpsCode);
      setCnrpsOptions(res.data.options || []);
      setCnrpsPurchaseType(null);
      setPromo(null);
      toast.success(
        res.data.message ||
          "Numéro CNRPS éligible — choisissez votre type d'achat."
      );
    } catch (error) {
      setLoadingCode(false);
      resetCnrpsState();
      toast.error(
        error.response?.data?.message ||
          "Vérification impossible. Réessayez plus tard."
      );
    }
  };

  const handleSelectPurchaseType = (option) => {
    if (!option) return;
    if (option.minSubtotal && total <= option.minSubtotal) {
      toast.error(
        `Cette remise est disponible uniquement pour un total supérieur à ${option.minSubtotal} TND.`
      );
      return;
    }
    setCnrpsPurchaseType(option.type);
    setPromo(option.discountPercent);
    toast.success(
      `Remise de ${option.discountPercent}% appliquée — ${option.label}.`
    );
  };

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
            <div
              className="cart-table-scroll"
              role="region"
              aria-label="Détail des articles du panier"
            >
              <div className="cart-table">
                <div className="cart-table__box">
                  <div className="cart-table__row cart-table__row-head cart-line-head">
                    <div className="cart-line__section cart-line__section--product">
                      Produit
                    </div>
                    <div className="cart-line__section cart-line__section--price">
                      Prix
                    </div>
                    <div className="cart-line__section cart-line__section--qty">
                      Quantité
                    </div>
                    <div className="cart-line__section cart-line__section--total">
                      Total
                    </div>
                    <div
                      className="cart-line__section cart-line__section--remove cart-line__section--head-spacer"
                      aria-hidden="true"
                    />
                  </div>

                  {cart.map((item) => (
                    <Card
                      onChangeQuantity={(change, quantity) =>
                        handleProductQuantity(
                          change,
                          quantity,
                          lineKey(item),
                          item.stock
                        )
                      }
                      key={lineKey(item)}
                      handleDelete={handleDelete}
                      cart={item}
                      lineId={lineKey(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="cart-bottom">
              <div className="cart-bottom__promo">
                <div className="box-field__row cart-cnrps-row">
                  <div className="box-field">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Numéro CNRPS"
                      aria-label="Numéro CNRPS"
                      value={cnrpsInput}
                      onChange={(e) => setCnrpsInput(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-grey" onClick={handleCnrps}>
                    {loadingCode ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          className="spinner"
                          style={{ width: "20px", height: "20px" }}
                        ></div>
                      </div>
                    ) : (
                      "Appliquer"
                    )}
                  </button>
                </div>

                {cnrpsCode && cnrpsOptions && cnrpsOptions.length > 0 && (
                  <div style={{ marginBottom: 24 }}>
                    <h6 style={{ marginBottom: 12 }}>
                      Type d&apos;achat (CNRPS validé)
                    </h6>
                    <p style={{ marginBottom: 12 }}>
                      Choisissez le type d&apos;achat pour appliquer la remise
                      correspondante :
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      {cnrpsOptions.map((option) => {
                        const disabled =
                          option.minSubtotal && total <= option.minSubtotal;
                        const selected = cnrpsPurchaseType === option.type;
                        return (
                          <button
                            key={option.type}
                            type="button"
                            onClick={() => handleSelectPurchaseType(option)}
                            disabled={disabled}
                            className={`btn ${selected ? "" : "btn-grey"}`}
                            style={{
                              opacity: disabled ? 0.5 : 1,
                              cursor: disabled ? "not-allowed" : "pointer",
                              textAlign: "left",
                              padding: "12px 16px",
                            }}
                          >
                            <strong>{option.label}</strong> — Remise{" "}
                            {option.discountPercent}%
                            {option.minSubtotal ? (
                              <div style={{ fontSize: 12, opacity: 0.8 }}>
                                Total articles &gt; {option.minSubtotal} TND
                                requis.
                              </div>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <h6>Remise CNRPS</h6>
                <p>
                  Saisissez votre numéro CNRPS pour vérifier votre éligibilité.
                  En cas d&apos;acceptation, vous choisissez :
                  <br />
                  &bull; <strong>20%</strong> pour un achat direct au comptant,
                  <br />
                  &bull; <strong>5%</strong> pour un achat sur le compte de
                  l&apos;Amicale.
                  <br />
                  La remise n&apos;est utilisable qu&apos;une seule fois par
                  numéro CNRPS. Le montant définitif est calculé et confirmé
                  sur le serveur au moment de la commande.
                </p>
                <div className="contacts-info__social">
                  <span>Trouvez-nous ici :</span>
                  <ul>
                    {socialLinks.map((social, index) => (
                      <li key={index}>
                        <a
                          href={social.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name || "Lien social"}
                        >
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
                  Remise CNRPS (indicatif)
                  <span> {promo ? promo + "%" : "Non"}</span>
                </div>
                <div className="cart-bottom__total-goods">
                  Livraison
                  <span>{SHIPPING_FEE_TND.toFixed(2)} TND</span>
                </div>
                <div className="cart-bottom__total-num">
                  Total :
                  <span>{grandTotal} TND</span>
                </div>
                <Link href="/checkout">
                  <a className="btn">Passer à la caisse</a>
                </Link>
              </div>
            </div>
          </div>
          <img
            className="promo-video__decor js-img"
            src="/assets/img/promo-video__decor.jpg"
            alt=""
          />
        </div>
      )}
    </>
  );
};
