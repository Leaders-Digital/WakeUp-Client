import React, { useEffect, useState } from "react";
import Card from "./Card/Card";
import axios from "axios";

const Partnaire = () => {
  const [partenaire, setPartenaire] = useState([]);

  const getPartenaire = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/partenaire/getPartenaires`, // Data being sent in the body of the request
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
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
  console.log(partenaire);

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        {partenaire.map((logo, index) =>(
          <Card logo={logo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Partnaire;