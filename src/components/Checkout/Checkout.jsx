import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CheckoutOrders } from "./CheckoutOrder/CheckoutOrders";
import { CheckoutStep1 } from "./CheckoutSteps/CheckoutStep1";
import { CheckoutStep2 } from "./CheckoutSteps/CheckoutStep2";
import { CheckoutStep3 } from "./CheckoutSteps/CheckoutStep3";
import toast, { Toaster } from "react-hot-toast";

import { CartContext, PromoContext } from "pages/_app";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";

const detailBlocks = [
  {
    step: "Étape 1",
    title: "Détails de la commande",
    icon: "icon-step1",
  },
  {
    step: "Étape 2",
    title: "Mode de paiement",
    icon: "icon-step2",
  },
  {
    step: "Étape 3",
    title: "Terminé !",
    icon: "icon-step3",
  },
];

export const Checkout = () => {
  const { promo, setPromo } = useContext(PromoContext);
  const { cart, setCart } = useContext(CartContext);
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [data, setData] = useState({
    nom: "",
    prenom: "",
    email: "",
    numTelephone: "",
    ville: "",
    adresse: "",
    gouvernorat: "",
    codePostal: "",
    note: "",
  });

  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const makeTheCartEmpty = () => {
    setCart([]); // Correct way to empty the cart
  };

  const total = cart.reduce((total, item) => {
    const prixFinal = item.solde
      ? item.prix - item.prix * (item.soldePourcentage / 100)
      : item.prix;

    return total + Number(prixFinal) * Number(item.quantity);
  }, 0);

  console.log("tootallll", total);

  const totalWithDiscount = promo ? total - (total * promo) / 100 : total;
  const listeDesProduits = [];
  const listeDesPack = [];

  cart.forEach((item) => {
    if (item.categorie !== "PACK") {
      listeDesProduits.push({
        variant: item.variantId,
        quantite: item.quantity,
      });
    } else {
      listeDesPack.push({
        pack: item._id,
        quantite: item.quantity,
      });
    }
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const {
      nom,
      prenom,
      email,
      numTelephone,
      ville,
      adresse,
      gouvernorat,
      codePostal,
      note,
    } = data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !nom ||
      !prenom ||
      !numTelephone ||
      !ville ||
      !adresse ||
      !gouvernorat ||
      !codePostal
    ) {
      // Trigger a toast notification if any field is empty
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      // Trigger a toast notification if the email is missing or invalid
      toast.error("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/order/create`,
        {
          ...data,
          listeDesProduits,
          listeDesPack,
          prixTotal: totalWithDiscount,
        }, // Data being sent in the body of the request
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );
      setOrderCode(res.data.orderCode);
      setLoading(false);
      // setActiveStep(activeStep + 1);
      setPromo(0);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  console.log("orderCode", {
    ...data,
    listeDesProduits,
    listeDesPack,
    prixTotal: totalWithDiscount,
  });

  const onlinePayment = async () => {
    try {
      await handleCreateOrder();
      let totalwithDilevery = (totalWithDiscount + 8)*1000;
      console.log("totalwithDilevery", totalwithDilevery);

      const paymentData = {
        receiverWalletId: "672256c051a38c7f6cb8bba5",
        token: "TND",
        amount: totalwithDilevery,
        type: "immediate",
        description: "payment description",
        acceptedPaymentMethods: ["wallet", "bank_card", "e-DINAR"],
        lifespan: 10,
        checkoutForm: true,
        addPaymentFeesToAmount: true,
        firstName: data.prenom,
        lastName: data.nom,
        phoneNumber: data.numTelephone,
        email: data.email,
        orderId: orderCode,
        webhook: "https://merchant.tech/api/notification_payment",
        silentWebhook: true,
        successUrl: "http://localhost:3000/checkout",
        failUrl: "https://gateway.sandbox.konnect.network/payment-failure",
        theme: "light",
      };

      const res = await axios.post(
        `https://api.preprod.konnect.network/api/v2/payments/init-payment`,
        paymentData,
        {
          headers: {
            "x-api-key": "672256c051a38c7f6cb8bb9d:FwrRxNCJDKERkDab8krLhZrq",
          },
        }
      );
      if (res.data.payUrl) {
        // redirect(res.data.payUrl)
        router.push(res.data.payUrl);
      } else {
        console.error("Payment URL not found in response");
      }
      // setOrderCode(res.data.orderCode);
      // setActiveStep(activeStep + 1);
      setPromo(0);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCart = () => {
    setMounted(true); // Mark component as mounted
    if (cart.length === 0) {
      router.push("/cart"); // Redirect if the cart is empty
    }
  };

  useEffect(() => {
    checkCart();
  }, [cart, router]);

  // Prevent server-side rendering issues
  if (!mounted) {
    return null; // Don't render anything on the server-side
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="wrapper">
        {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
        <div className="detail-block__items">
          {detailBlocks.map((block, index) => (
            <div
              key={index}
              className={`detail-block__item ${
                activeStep <= index && "detail-block__item-inactive"
              }`}
            >
              <div className="detail-block__item-icon">
                <img
                  src={
                    activeStep <= index
                      ? "/assets/img/main-text-decor2.svg"
                      : "/assets/img/main-text-decor.svg"
                  }
                  className="js-img"
                  alt=""
                />
                <i className={block.icon}></i>
              </div>
              <div className="detail-block__item-info">
                <h6>{block.step}</h6>
                {block.title}
              </div>
            </div>
          ))}
        </div>
        {/* <!-- DETAIL MAIN BLOCK EOF --> */}
      </div>

      {/* <!-- BEGIN CHECKOUT --> */}
      <div className={`checkout ${activeStep == 2 && "checkout-step2"}`}>
        <div className="wrapper">
          <div className="checkout-content">
            {(() => {
              switch (activeStep) {
                case 1:
                  return (
                    <CheckoutStep1
                      onNext={handleNext}
                      data={data}
                      setData={setData}
                      handleChange={handleChange}
                    />
                  );
                case 2:
                  return (
                    <CheckoutStep2
                      onNext={handleNext}
                      onPrev={handlePrev}
                      handleCreateOrder={handleCreateOrder}
                      onlinePayment={onlinePayment}
                      loading={loading}
                    />
                  );
                case 3:
                  return (
                    <CheckoutStep3
                      orderCode={orderCode}
                      makeTheCartEmpty={makeTheCartEmpty}
                    />
                  );

                default:
                  return null;
              }
            })()}
            <div className="checkout-info">
              <CheckoutOrders total={total} />
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- CHECKOUT EOF   --> */}
    </>
  );
};
