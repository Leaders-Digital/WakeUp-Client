import { useContext, useState } from "react";
import { CheckoutOrders } from "./CheckoutOrder/CheckoutOrders";
import { CheckoutStep1 } from "./CheckoutSteps/CheckoutStep1";
import { CheckoutStep2 } from "./CheckoutSteps/CheckoutStep2";
import { CheckoutStep3 } from "./CheckoutSteps/CheckoutStep3";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "pages/_app";
import axios from "axios";

const detailBlocks = [
  {
    step: "Step 1",
    title: "Order Details",
    icon: "icon-step1",
  },
  {
    step: "Step 2",
    title: "Payment method",
    icon: "icon-step2",
  },
  {
    step: "Step 3",
    title: "Finish!",
    icon: "icon-step3",
  },
];

export const Checkout = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
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

  const { cart } = useContext(CartContext);

  const total = cart.reduce(
    (total, item) => total + Number(item.prix) * Number(item.quantity),
    0
  );

  const listeDesProduits = cart.map((item) => ({
    variant: item.variantId,
    quantite: item.quantity,
  }));

  console.log(listeDesProduits);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleNextPage = () => {
    setActiveStep(activeStep + 1);
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

    if (
      !nom ||
      !prenom ||
      !email ||
      !numTelephone ||
      !ville ||
      !adresse ||
      !gouvernorat ||
      !codePostal ||
      !note
    ) {
      console.log(data);

      // Trigger a toast notification if any field is empty
      toast.error("Veuillez remplir tous les champs."); // This will show the error message
      return; // Exit the function if validation fails
    }
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:7000/api/order/create", {
        ...data,
        listeDesProduits,
        prixTotal: total,
      });
      setTimeout(() => {
        setLoading(false);
        handleNextPage();
        console.log("order created");
      }, 1500);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        console.log("order failed");
      }, 1500);
    }
  };

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
                      loading={loading}
                    />
                  );
                case 3:
                  return <CheckoutStep3 />;

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
