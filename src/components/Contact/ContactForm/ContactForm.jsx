import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export const ContactFrom = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if(!name || !email || !message){
        return toast.error("Veuillez remplir tous les champs")
      }
      setName("");
      setEmail("");
      setMessage("");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/reclamation/create`,
        {
          nom:name,
          email,
          message,
        }
      );
      toast.success("Votre message a été envoyé avec succès");
    } catch (error) {
      toast.error("Problème lors de l'envoi du message");

      console.log(error);
    }
  };
  return (
    <>
      <Toaster position="bottom-center" />
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className="discount discount-contacts js-img"
        style={{ backgroundImage: `url('/assets/img/discount-bg3.jpg')` }}
      >
        <div className="wrapper">
          <div className="discount-info">
            <span className="saint-text">écrivez-nous</span>
            <span className="main-text">laissez un message</span>
            <p>
              Écrivez-nous si vous avez des questions, nous vous contacterons
              certainement et trouverons une solution.
            </p>
          
              <div className="box-field">
                <input
                  value={name}
                  type="text"
                  className="form-control"
                  placeholder="Entrez votre nom"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="box-field">
                <input
                  value={email}
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="box-field box-field__textarea">
                <textarea
                  value={message}
                  className="form-control"
                  placeholder="Entrez votre message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <button onClick={handleSubmit} className="btn">
                envoyer
              </button>
   
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
