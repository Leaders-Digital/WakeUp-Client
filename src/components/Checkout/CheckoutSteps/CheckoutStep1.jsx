import { useState } from "react";
import Dropdown from "react-dropdown";


const countries = [
  "Ariana",
  "Béja",
  "Ben Arous",
  "Bizerte",
  "Gabès",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kébili",
  "Kef",
  "Mahdia",
  "Manouba",
  "Médenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan"
];

export const CheckoutStep1 = ({ onNext , data , setData ,handleChange  }) => {


  return (
    <>
      {/* <!-- BEING CHECKOUT STEP ONE -->  */}
      <div className="checkout-form">
        <form onClick={(e) => e.preventDefault()}>
          <div className="checkout-form__item">
            <h4>Info about you</h4>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={data.nom}
                name="nom"
                onChange={handleChange}
              />
            </div>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your last name"
                value={data.prenom}
                name="prenom"
                onChange={handleChange}
              />
            </div>
            <div className="box-field__row">
              <div className="box-field">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your phone"
                  value={data.numTelephone}
                  name="numTelephone"
                  onChange={handleChange}
                />
              </div>
              <div className="box-field">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your mail"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Delivery Info</h4>

            <Dropdown
              options={countries}
              className="react-dropdown"
              value={data.gouvernorat}
              onChange={(e) => setData({ ...data, gouvernorat: e.value })}
              placeholder="Select a country"
              name="gouvernorat"
            />
            <div className="box-field__row">
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the city"
                  value={data.ville}
                  name="ville"
                  onChange={handleChange}
                />
              </div>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the postal code"
                  value={data.codePostal}
                  name="codePostal"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the address"
                value={data.adresse}
                name="adresse"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Note</h4>
            <div className="box-field box-field__textarea">
              <textarea
                className="form-control"
                placeholder="Order note"
                value={data.note}
                name="note"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="checkout-buttons">
            {/* <button className='btn btn-grey btn-icon'>
              {' '}
              <i className='icon-arrow'></i> back
            </button> */}
            <button onClick={onNext} className="btn btn-icon btn-next">
              next <i className="icon-arrow"></i>
            </button>
          </div>
        </form>
      </div>
      {/* <!-- CHECKOUT STEP ONE EOF -->  */}
    </>
  );
};
