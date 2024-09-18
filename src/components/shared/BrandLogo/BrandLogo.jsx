import React, { useEffect, useState } from "react";
import axios from "axios";
const BrandLogo = () => {
  const [partenaire, setPartenaire] = useState([]);

  const getPartenaire = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/partenaire/getPartenaires"
      );
      console.log(response.data.data);
      setPartenaire(response.data.data);
    } catch (error) {
      throw error;
    }
  };
useEffect(()=>{
  getPartenaire()
},[])

  return (
    <>
    <h1 style={{textAlign:"center",marginBottom:"40px",fontSize:"50px"}}>Nos Partenaires</h1>
      {/* <!-- BEGIN LOGOS --> */}
      <div className="main-logos">
        {partenaire.map((logo, index) => (
          console.log(logo.logo,"herreee"),
          
          <a key={index}   >
            <img src={"http://localhost:7000/"+logo.logo} className="js-img" width={150 } height={150 } alt="" />
          </a>
        ))}
      </div>
      {/* <!-- LOGOS EOF   --></img> */}
    </>
  );
};

export default BrandLogo;
