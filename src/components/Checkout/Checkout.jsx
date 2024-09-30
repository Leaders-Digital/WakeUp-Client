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
  const [orderCode, setOrderCode] = useState("");
  const { cart, setCart } = useContext(CartContext);

  const makeTheCartEmpty = () => {
    setCart([]); // Correct way to empty the cart
  };
  const total = cart.reduce(
    (total, item) => total + Number(item.prix) * Number(item.quantity),
    0
  );

  const listeDesProduits = [];
  const listeDesPack = [];
console.log("cart",cart);

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
console.log("listeDesProduits",listeDesProduits);
console.log("listeDesPack",listeDesPack);

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
      !numTelephone ||
      !ville ||
      !adresse ||
      !gouvernorat ||
      !codePostal
    ) {
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
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/order/create`,
        {
          ...data,
          listeDesProduits,
          listeDesPack,
          prixTotal: total,
        }
      );
      setOrderCode(res.data.orderCode);

      setTimeout(() => {
        setLoading(false);
        handleNextPage();
        makeTheCartEmpty();
      }, 1000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setLoading(false);
        // makeTheCartEmpty();
      }, 1000);
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
                  return <CheckoutStep3 orderCode={orderCode} />;

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
