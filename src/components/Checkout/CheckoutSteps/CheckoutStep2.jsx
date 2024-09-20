import { useState } from "react";
import laodingGif from "../../../assets/gifcard.gif";
export const CheckoutStep2 = ({
  onNext,
  onPrev,
  handleCreateOrder,
  loading,
}) => {
  const [payment, setPayment] = useState("credit-card");
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      {!loading ? (
        <div className="checkout-payment checkout-form">
          <h4>Payment Methods</h4>
          <div
            className={`checkout-payment__item ${
              payment === "cash" && "active"
            }`}
          >
            <div className="checkout-payment__item-head">
              <label onClick={() => setPayment("cash")} className="radio-box">
                Cash payment
                <input type="radio" checked={payment === "cash"} name="radio" />
                <span className="checkmark"></span>
                <span className="radio-box__info">
                  <i className="icon-info"></i>
                  <span className="radio-box__info-content">
                    Aliqua nulla id aliqua minim ullamco adipisicing enim. Do
                    sint nisi velit qui. Ullamco Lorem aliquip dolor nostrud
                    cupidatat amet.
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div className="checkout-buttons">
            <button onClick={onPrev} className="btn btn-grey btn-icon">
              <i className="icon-arrow"></i> back
            </button>
            <button
              onClick={() => {
                handleCreateOrder();
              }}
              className="btn btn-icon btn-next"
            >
              next <i className="icon-arrow"></i>
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center",textAlign:"center",width:"100%" }}>
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <div className="spinner"></div>
           <h6>Creation de Votre commande</h6>
          </div>
        </div>
      )}
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
