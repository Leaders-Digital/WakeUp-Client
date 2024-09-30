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
            <h4>Informations sur vous</h4>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre prénom"
                value={data.nom}
                name="nom"
                onChange={handleChange}
              />
            </div>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre nom"
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
                  placeholder="Entrez votre numéro de téléphone"
                  value={data.numTelephone}
                  name="numTelephone"
                  onChange={handleChange}
                />
              </div>
              <div className="box-field">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Informations de livraison</h4>

            <Dropdown
              options={countries}
              className="react-dropdown"
              value={data.gouvernorat}
              onChange={(e) => setData({ ...data, gouvernorat: e.value })}
              placeholder="Sélectionnez un gouvernorat"
              name="gouvernorat"
            />
            <div className="box-field__row">
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez la ville"
                  value={data.ville}
                  name="ville"
                  onChange={handleChange}
                />
              </div>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le code postal"
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
                placeholder="Entrez l'adresse"
                value={data.adresse}
                name="adresse"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Remarque</h4>
            <div className="box-field box-field__textarea">
              <textarea
                className="form-control"
                placeholder="Remarque de commande"
                value={data.note}
                name="note"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="checkout-buttons">
            <button onClick={onNext} className="btn btn-icon btn-next">
              suivant <i className="icon-arrow"></i>
            </button>
          </div>
        </form>
      </div>
      {/* <!-- CHECKOUT STEP ONE EOF -->  */}
    </>
  );
};
