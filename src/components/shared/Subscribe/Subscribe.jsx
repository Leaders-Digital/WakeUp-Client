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
      return; // Quitter la fonction si l'e-mail est invalide
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/subscribe`,
        { email }, // Données envoyées dans le corps de la requête
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY, // Envoyer la clé API dans l'en-tête de la requête
          },
        }
      );
      setEmail(""); // Vider le champ e-mail
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {/* <!-- DÉBUT ABONNEMENT --> */}
      <div className="subscribe">
        <Toaster />
        <div className="wrapper">
          <div className="subscribe-form">
            <div className="subscribe-form__img">
              <img
                src="/assets/img/subscribe-img.png"
                className="js-img"
                width={400}
                height={300}
                alt=""
              />
            </div>
            <div className="toform">
              <h3>Restez en contact</h3>
              <p>Soignez votre peau avec des produits cosmétiques sans toxines.</p>
              <div className="box-field__row">
                <div className="box-field">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Entrez votre e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button onClick={handleSubmit} className="btn">
                  s'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- FIN ABONNEMENT --> */}
    </>
  );
};
