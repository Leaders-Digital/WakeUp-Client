import { useState } from "react";
import laodingGif from "../../../assets/gifcard.gif";
export const CheckoutStep2 = ({
  onNext,
  onPrev,
  handleCreateOrder,
  onlinePayment,
  loading,
}) => {
  const [payment, setPayment] = useState("cash");
  console.log(payment);

  const handleOrder = () => {
    if (payment === "cash") {
      handleCreateOrder("cash");
    } else {
      onlinePayment();
    }
  };
  

  

  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      {!loading ? (
        <div className="checkout-payment checkout-form">
          <h4>Méthodes de paiement</h4>
          <div
            className={`checkout-payment__item ${
              payment === "cash" && "active"
            }`}
          >
            <div className="checkout-payment__item-head">
              <label onClick={() => setPayment("cash")} className="radio-box">
                Paiement en espèces
                <input type="radio" checked={payment === "cash"} name="radio" />
                <span className="checkmark"></span>
                <span className="radio-box__info">
                  <i className="icon-info"></i>
                  <span className="radio-box__info-content">
                    Le paiement à la livraison est disponible en Tunisie.
                    Profitez de ce mode de paiement simple et sécurisé pour
                    recevoir vos produits à domicile.
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div
              className={`checkout-payment__item ${
                payment === "card" && "active"
              }`}
          >
            <div
              className="checkout-payment__item-head"
            >
              <label className="radio-box" onClick={() => setPayment("card")}>
                Paiement en Ligne
                <input type="radio" checked={payment === "card"} name="radio" />
                <span className="checkmark"></span>
                <span className="radio-box__info">
                  <i className="icon-info"></i>
                  <span className="radio-box__info-content">
                  Le paiement en ligne est maintenant disponible sur notre site ! Profitez d'un moyen simple, rapide et sécurisé pour régler vos achats.
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="checkout-buttons">
            <button onClick={onPrev} className="btn btn-grey btn-icon">
              <i className="icon-arrow"></i> Retour
            </button>
            <button
              onClick={() => {
                handleOrder();
              }}
              className="btn btn-icon btn-next"
            >
              Suivant <i className="icon-arrow"></i>
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner"></div>
            <h6>Création de votre commande</h6>
          </div>
        </div>
      )}
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
