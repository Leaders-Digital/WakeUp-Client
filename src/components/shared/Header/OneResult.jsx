import React from "react";

const OneResult = ({ result }) => {
    console.log(result);
    
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#eee",
        marginBottom: "5px",
      }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_API_KEY}` + result.mainPicture}
        alt=""
        style={{ width: "100px", heightwidth: "100px", objectFit: "contain" }}
      />
      <div> 
        <h6>{result.nom}</h6>
        {/* <p>{result.prix}</p> */}

      </div>
      
    </div>
  );
};

export default OneResult;
