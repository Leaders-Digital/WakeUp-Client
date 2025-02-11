import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Card/Card";

const Partnaire = () => {

  return (
    <div className="container-md">
      <div className="row justify-content-center">
          <Cards  />
      </div>
    </div>
  );
};

export default Partnaire;
