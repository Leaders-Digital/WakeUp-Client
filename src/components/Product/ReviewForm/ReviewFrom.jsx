import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Rating } from "react-simple-star-rating";

export const ReviewFrom = ({ productId, getProduct, productimage }) => {
  const [rating, setRating] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSendReview = async () => {
    if (!data.name?.trim() || !data.email?.trim() || !data.comment?.trim()) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }
    if (rating <= 0) {
      toast.error("Veuillez attribuer une note.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}api/review/add-review`,
        {
          ...data,
          rating: rating / 20,
          productId,
        },
        {
          headers: { "x-api-key": process.env.NEXT_PUBLIC_KEY },
        }
      );
      setData({ name: "", email: "", comment: "" });
      setRating(0);
      if (getProduct) getProduct(productId);
      toast.success("Votre avis a été envoyé avec succès");
    } catch (error) {
      toast.error("Impossible d'envoyer l'avis. Réessayez plus tard.");
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <!-- Product Review Form --> */}
      <div className="product-detail__form post-comment__form">
        <div className="subscribe-form__img">
          {/* <img src={"http://localhost:7000/" + productimage} /> */}
        </div>

        <h4>Laissez un avis</h4>
        <p>Votre adresse email ne sera pas publiée.</p>
        <div className="rating" data-id="rating_1">
          <Rating
            onClick={handleRating}
            value={rating}
            ratingValue={rating}
            fillColor="#cfc819"
            size="20px"
            emptyColor="#fff" 
          />
        </div>
        <div className="box-field">
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre nom"
            aria-label="Votre nom"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="box-field">
          <input
            type="email"
            className="form-control"
            placeholder="Entrez votre adresse email"
            aria-label="Votre adresse email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="box-field box-field__textarea">
          <textarea
            className="form-control"
            placeholder="Entrez votre avis"
            aria-label="Votre avis"
            name="comment"
            value={data.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="button" className="btn" onClick={handleSendReview}>
          Envoyer
        </button>
      </div>
    </>
  );
};
