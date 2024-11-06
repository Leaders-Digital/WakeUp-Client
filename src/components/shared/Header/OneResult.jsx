import Link from "next/link";
import React from "react";

const OneResult = ({ result , onConfirme }) => {
  return (
    <Link href={`/product/${result._id}`}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "5px",
      }}
      className="search-result"
      onClick={onConfirme}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_KEY}` + result.mainPicture}
        alt=""
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "70px",
        }}
      >
        <h5 style={{ fontSize: "20px" }}>{result.nom}</h5>
        <h6 style={{ fontSize: "14px" }}>{result.subCategorie}</h6>
        <div className="product-info__color">
          <ul>
            {result?.variantDetails &&
              result?.variantDetails
                .filter((variant) => variant.quantity > 0) // Filter out variants with zero quantity
                .map((variant, index) => (
                  <li
                    key={index}
                    style={{
                      backgroundColor: variant.color,
                      opacity: variant.quantity ? "1" : "0.8",
                      margin: "1px",
                    }}
                  >
                    {/* Additional content can go here */}
                  </li>
                ))}
          </ul>
        </div>
        {/* <p>{result.prix}</p> */}
      </div>
    </div>
    </Link>
  );
};

export default OneResult;
