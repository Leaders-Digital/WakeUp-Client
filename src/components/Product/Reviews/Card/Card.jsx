const Card = ({ review }) => {
  const { name, createdAt, rating, comment } = review;
  return (
    <div className="review-item">
      <div className="review-item__head">
        <div className="review-item__author">
          <img
            src={
              "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726444800&semt=ais_hybrid"
            }
            className="js-img"
            alt=""
          />
          <span className="review-item__name">{name}</span>
          <span className="review-item__date">
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="review-item__rating">
          <ul className="star-rating">
            {[...Array(rating)].map((star, index) => {
              return (
                <li key={index}>
                  <i className="icon-star"></i>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="review-item__content">{comment}</div>
    </div>
  );
};

export default Card; // If you decide to keep it in the same file.