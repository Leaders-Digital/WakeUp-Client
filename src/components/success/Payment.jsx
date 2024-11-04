import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Payment = () => {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div style={{ minHeight: "50vh", textAlign: "center", marginTop: "60px" }}>
      <h2>Paiement Réussi</h2>
      {orderId ? (
        <div>
          <h3>Merci pour votre achat !</h3>
          <p>Votre numéro de commande est : <strong>{orderId}</strong></p>
          <p>Vous recevrez un e-mail de confirmation avec les détails de votre commande sous peu.</p>

          <Link href="/shop">
            <a className="btn" style={{ marginTop: "30px" }}>
              Continuer vos achats
            </a>
          </Link>
        </div>
      ) : (
        <p>Aucun identifiant de commande fourni</p>
      )}
    </div>
  );
};

export default Payment;
