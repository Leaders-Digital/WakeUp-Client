import axios from "axios";
import { useState } from "react";
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
    // other logic
  };
console.log("ssdsdsd",productimage);

  const handleSendReview = async (e) => {
    try {
      console.log({
        ...data,
        rating: rating / 20,
        productId,
      });
      setData({
        name: "",
        email: "",
        comment: "",
      });
      setRating(0);
      await axios.post("http://localhost:7000/api/review/add-review", {
        ...data,
        rating: rating / 20,
        productId,
      });
      getProduct(productId);
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

        <h4>leave a review</h4>
        <p>Your email address will not be published.</p>
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
            placeholder="Enter your name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="box-field">
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="box-field box-field__textarea">
          <textarea
            className="form-control"
            placeholder="Enter your review"
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
          send
        </button>
      </div>
    </>
  );
};