import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Payment = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [orderCode, setOrderCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPayed, setIsPayed] = useState(null);

  console.log("orderId", orderId);

  const handleCheckout = async () => {
    if (!orderId) return; // Early return if orderId is undefined
    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}api/order/checkpayment/${orderId}`,
        {},
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY,
          },
        }
      );
      setOrderCode(res.data.data.orderCode);
      setIsPayed(true);
    } catch (error) {
      console.error("Error checking payment:", error);
      setIsPayed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      handleCheckout();
    }
  }, [orderId]);

  return (
    <div style={{ minHeight: "50vh", textAlign: "center", marginTop: "60px" }}>
      {loading ? (
        <>
          <p>En cours de vérification</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="spinner"></div>
          </div>
        </>
      ) : isPayed ? (
        <div>
          <h2>Paiement Réussi</h2>
          <h3>Merci pour votre achat !</h3>
          <p>
            Votre numéro de commande est : <strong>{orderCode}</strong>
          </p>
          <p>
            Vous recevrez un e-mail de confirmation avec les détails de votre
            commande sous peu.
          </p>

          <Link href="/shop">
            <a className="btn" style={{ marginTop: "30px" }}>
              Continuer vos achats
            </a>
          </Link>
        </div>
      ) : (
        <div>
          <h2>Échec du paiement</h2>
          <p>Veuillez réessayer ou contacter le support.</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
