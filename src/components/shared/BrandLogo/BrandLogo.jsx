import React, { useEffect, useState } from "react";
import axios from "axios";
const BrandLogo = () => {
  const [partenaire, setPartenaire] = useState([]);

  const getPartenaire = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}api/partenaire/getPartenaires`
      );
    
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
          <a key={index}   >
            <img src={`${process.env.NEXT_PUBLIC_API_KEY}`+logo.logo} className="js-img" width={200} height={200} alt="" style={{objectFit:"contain"}} />
          </a>
        ))}
      </div>
      {/* <!-- LOGOS EOF   --></img> */}
    </>
  );
};

export default BrandLogo;
