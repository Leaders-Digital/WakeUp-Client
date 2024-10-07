import Link from "next/link";
import React from "react";

// Helper function to calculate today's date and add 2 days

export const CheckoutStep3 = ({ orderCode , makeTheCartEmpty}) => {
  
  const getLoadingDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 2); // Add 2 days
    return futureDate.toLocaleDateString(); // Format as dd/mm/yyyy or mm/dd/yyyy depending on locale
  };
  const loadingDate = getLoadingDate(); // Get the dynamic loading date
  
  return (
    <>
      {/* <!-- CHECKOUT ÉTAPE TROIS -->  */}
      <div className="checkout-purchase checkout-form">
        <h4>
          Wakeup vous remercie
          <br />
          pour votre achat !
        </h4>
        <p>
          Votre commande a été créée avec succès. Nous vous enverrons un email
          de confirmation contenant les détails de votre commande. Si vous avez
          des questions ou des préoccupations, n'hésitez pas à nous contacter.
          Merci pour votre confiance et à bientôt sur Wakeup !
        </p>
        <ul className="checkout-purchase__list">
          <li>
            <span>Numéro de commande</span> {orderCode}
          </li>
          <li>
            <span>Statut de la commande</span> En cours
          </li>
          <li>
            <span>Livrer dans 24h</span>24h - 48h
          </li>
          <li>
            <span>Date prévue de chargement</span> {loadingDate}
          </li>
        </ul>
        <div
          style={{ minHeight: "50vh", textAlign: "center", marginTop: "60px" }}
        >
          <Link href="/shop">
            <a className="btn" style={{ marginTop: "30px" }} onClick={makeTheCartEmpty}>
              Continuer vos achats
            </a>
          </Link>
        </div>
      </div>
      {/* <!-- CHECKOUT ÉTAPE TROIS FIN -->  */}
    </>
  );
};
