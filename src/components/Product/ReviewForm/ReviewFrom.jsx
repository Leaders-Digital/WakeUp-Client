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

  const handleSendReview = async (e) => {
    try {
      setData({
        name: "",
        email: "",
        comment: "",
      });
      setRating(0);
      await axios.post(`${process.env.NEXT_PUBLIC_API_KEY}api/review/add-review`, {
        ...data,
        rating: rating / 20,
        productId,
      },  // Data being sent in the body of the request
      {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
        },
      });
      getProduct(productId);
      toast.success("Votre avis a été envoyé avec succès");
    } catch (error) {
      console.log(error);
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
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="box-field box-field__textarea">
          <textarea
            className="form-control"
            placeholder="Entrez votre avis"
            name="comment"
            value={data.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="btn"
          onClick={() => {
            handleSendReview();
          }}
        >
          Envoyer
        </button>
      </div>
    </>
  );
};
