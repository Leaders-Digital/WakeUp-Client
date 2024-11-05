import React from "react";

const Card = ({ logo }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-3 d-flex justify-content-center">
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`${process.env.NEXT_PUBLIC_API_KEY}${logo.logo}`}
        className="card-img-top"
        alt={logo.nom}
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          padding: "5px",
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{logo.nom}</h5>
        <p className="card-text">{logo.adresse}</p>
        <p className="card-text">
          <small className="text-body-secondary">{logo.telephone}</small>
        </p>
        <a href={logo.location} className="btn btn-primary">
          Voir sur la map <i className="fa-solid fa-location-dot" style={{ color: "#D47E00" }}></i>
        </a>
      </div>
    </div>
  </div>
  
  );
};

export default Card;
