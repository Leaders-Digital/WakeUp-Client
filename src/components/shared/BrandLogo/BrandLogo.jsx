import React, { useEffect, useState } from "react";
import axios from "axios";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { getImageUrl } from "utils/imageUrl";
const BrandLogo = () => {
  const [partenaire, setPartenaire] = useState([]);

  const getPartenaire = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/partenaire/getPartenaires`,  // Data being sent in the body of the request
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );

      setPartenaire(response.data.data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getPartenaire();
  }, []);

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <SectionTitle
          subTitle="Nos Partenaires"
          title="Partenaires de Confiance"
          body="Découvrez nos partenaires de confiance qui partagent notre engagement pour des produits éthiques et durables."
        />

        {/* <!-- BEGIN LOGOS --> */}

        <div className="main-logos">
          {partenaire.map((logo, index) => (
            <a key={index}>
              <img
                src={getImageUrl(logo.logo)}
                className="js-img"
                width={200}
                height={200}
                alt=""
                style={{ objectFit: "contain" }}
              />
            </a>
          ))}
        </div>
        {/* <!-- LOGOS EOF   --></img> */}
      </div>
    </>
  );
};

export default BrandLogo;
