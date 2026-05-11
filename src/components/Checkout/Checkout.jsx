import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CheckoutOrders } from "./CheckoutOrder/CheckoutOrders";
import { CheckoutStep1 } from "./CheckoutSteps/CheckoutStep1";
import { CheckoutStep2 } from "./CheckoutSteps/CheckoutStep2";
import { CheckoutStep3 } from "./CheckoutSteps/CheckoutStep3";
import toast, { Toaster } from "react-hot-toast";

import { CartContext, PromoContext } from "pages/_app";
import axios from "axios";

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
  const {
    promo,
    setPromo,
    cnrpsCode,
    setCnrpsCode,
    setCnrpsOptions,
    cnrpsPurchaseType,
    setCnrpsPurchaseType,
  } = useContext(PromoContext);
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

  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    setBaseURL(`${window.location.protocol}//${window.location.host}`);
  }, []);

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

  // CheckoutStep1 validates internally and only calls onNext when the form is valid.
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateOrder = async (method) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        listeDesProduits,
        listeDesPack,
      };
      if (cnrpsCode && cnrpsPurchaseType) {
        payload.cnrpsCode = cnrpsCode;
        payload.cnrpsPurchaseType = cnrpsPurchaseType;
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/order/create`,
        payload,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY,
          },
        }
      );

      const pricing = res.data.pricing;

      if (method === "cash") {
        setOrderCode(res.data.orderCode);
        setActiveStep(activeStep + 1);
        setLoading(false);
      }

      setPromo(null);
      setCnrpsCode(null);
      setCnrpsOptions([]);
      setCnrpsPurchaseType(null);

      return { orderId: res.data.data._id, pricing };
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Impossible de créer la commande."
      );
      if (method === "pay") {
        throw error;
      }
      return null;
    }
  };

  const onlinePayment = async () => {
    try {
      const created = await handleCreateOrder("pay");
      if (!created) return;
      const { orderId: orderid } = created;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/payment/init`,
        { orderId: orderid, baseUrl: baseURL },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY,
          },
        }
      );

      if (res.data?.payUrl) {
        router.push(res.data.payUrl);
      } else {
        toast.error("Lien de paiement indisponible. Veuillez réessayer.");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          "Échec de l'initialisation du paiement."
      );
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
