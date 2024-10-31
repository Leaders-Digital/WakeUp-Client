import React from "react";

const Card = ({ logo }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-3 d-flex justify-content-center">
      <div className="card" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`${process.env.NEXT_PUBLIC_API_KEY}` + logo.logo}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                padding: "5px",
              }}
              className="img-fluid rounded-start"
              alt={logo.nom}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{logo.nom}</h5>
              <p className="card-text">{logo.adresse}</p>
              <p className="card-text">
                <small className="text-body-secondary">{logo.telephone}</small>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "right",
                    gap: "5px",
                    cursor: "pointer",
                  }}
                >
                  <a href={logo.location}>Voir sur la map </a>
                  <i class="fa-solid fa-location-dot" style={{color:"#D47E00"}}></i>
                </span>
              </p>
            </div>
          </div>
          {/* <a href={logo.location} type="button" class="btn btn-primary" style={{borderRadius:"0"}}>consulter</a> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
