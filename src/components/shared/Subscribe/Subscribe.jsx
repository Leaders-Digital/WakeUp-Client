import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const Subscribe = () => {
  const [email, setEmail] = useState("");
  const isValidEmail = (email) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      toast.error("Veuillez entrer une adresse e-mail valide.");
      return; // Exit the function if the email is invalid
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/subscribe`,
        { email }
      );
      setEmail(""); // Clear the email field
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {/* <!-- BEGIN SUBSCRIBE --> */}
      <div className="subscribe">
        <Toaster />
        <div className="wrapper">
          <div className="subscribe-form">
            <div className="subscribe-form__img">
              <img
                src="/assets/img/subscribe-img.png"
                className="js-img"
                alt=""
              />
            </div>
            <div className="toform">
              <h3>Stay in touch</h3>
              <p>Nourish your skin with toxin-free cosmetic roducts.</p>
              <div className="box-field__row">
                <div className="box-field">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button onClick={handleSubmit} className="btn">
                  subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- SUBSCRIBE EOF   --> */}
    </>
  );
};
