import { useState } from "react";
import Dropdown from "react-dropdown";

const GOUVERNORATS = [
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
  "Zaghouan",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d][\d\s-]{6,}$/;

const fieldErrorStyle = (hasError) => ({
  borderColor: hasError ? "#d93025" : undefined,
});

export const CheckoutStep1 = ({ onNext, data, setData, handleChange }) => {
  const [touched, setTouched] = useState({});

  const markTouched = (name) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  const errors = {
    prenom: !data.prenom?.trim() ? "Le prénom est requis." : null,
    nom: !data.nom?.trim() ? "Le nom est requis." : null,
    numTelephone: !data.numTelephone?.trim()
      ? "Le numéro de téléphone est requis."
      : !PHONE_REGEX.test(data.numTelephone.trim())
      ? "Numéro de téléphone invalide."
      : null,
    email: !data.email?.trim()
      ? "L'adresse e-mail est requise."
      : !EMAIL_REGEX.test(data.email.trim())
      ? "Adresse e-mail invalide."
      : null,
    gouvernorat: !data.gouvernorat ? "Le gouvernorat est requis." : null,
    ville: !data.ville?.trim() ? "La ville est requise." : null,
    codePostal: !data.codePostal?.trim() ? "Le code postal est requis." : null,
    adresse: !data.adresse?.trim() ? "L'adresse est requise." : null,
  };

  const handleNextClick = () => {
    // Mark every field touched so all errors show up.
    setTouched(
      Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );
    if (Object.values(errors).some(Boolean)) {
      return;
    }
    onNext();
  };

  const showError = (name) => touched[name] && errors[name];

  return (
    <>
      <div className="checkout-form">
        <form onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="checkout-form__item">
            <h4>Informations sur vous</h4>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre prénom"
                aria-label="Prénom"
                value={data.prenom}
                name="prenom"
                onChange={handleChange}
                onBlur={() => markTouched("prenom")}
                style={fieldErrorStyle(showError("prenom"))}
              />
              {showError("prenom") && (
                <small style={{ color: "#d93025" }}>{errors.prenom}</small>
              )}
            </div>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez votre nom"
                aria-label="Nom"
                value={data.nom}
                name="nom"
                onChange={handleChange}
                onBlur={() => markTouched("nom")}
                style={fieldErrorStyle(showError("nom"))}
              />
              {showError("nom") && (
                <small style={{ color: "#d93025" }}>{errors.nom}</small>
              )}
            </div>
            <div className="box-field__row">
              <div className="box-field">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Entrez votre numéro de téléphone"
                  aria-label="Numéro de téléphone"
                  value={data.numTelephone}
                  name="numTelephone"
                  onChange={handleChange}
                  onBlur={() => markTouched("numTelephone")}
                  style={fieldErrorStyle(showError("numTelephone"))}
                />
                {showError("numTelephone") && (
                  <small style={{ color: "#d93025" }}>
                    {errors.numTelephone}
                  </small>
                )}
              </div>
              <div className="box-field">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrez votre email"
                  aria-label="Adresse e-mail"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                  onBlur={() => markTouched("email")}
                  style={fieldErrorStyle(showError("email"))}
                />
                {showError("email") && (
                  <small style={{ color: "#d93025" }}>{errors.email}</small>
                )}
              </div>
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Informations de livraison</h4>

            <Dropdown
              options={GOUVERNORATS}
              className="react-dropdown"
              value={data.gouvernorat}
              onChange={(e) => {
                setData({ ...data, gouvernorat: e.value });
                markTouched("gouvernorat");
              }}
              placeholder="Sélectionnez un gouvernorat"
              name="gouvernorat"
            />
            {showError("gouvernorat") && (
              <small style={{ color: "#d93025" }}>{errors.gouvernorat}</small>
            )}
            <div className="box-field__row">
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez la ville"
                  aria-label="Ville"
                  value={data.ville}
                  name="ville"
                  onChange={handleChange}
                  onBlur={() => markTouched("ville")}
                  style={fieldErrorStyle(showError("ville"))}
                />
                {showError("ville") && (
                  <small style={{ color: "#d93025" }}>{errors.ville}</small>
                )}
              </div>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Entrez le code postal"
                  aria-label="Code postal"
                  value={data.codePostal}
                  name="codePostal"
                  onChange={handleChange}
                  onBlur={() => markTouched("codePostal")}
                  style={fieldErrorStyle(showError("codePostal"))}
                />
                {showError("codePostal") && (
                  <small style={{ color: "#d93025" }}>
                    {errors.codePostal}
                  </small>
                )}
              </div>
            </div>
            <div className="box-field">
              <input
                type="text"
                className="form-control"
                placeholder="Entrez l'adresse"
                aria-label="Adresse"
                value={data.adresse}
                name="adresse"
                onChange={handleChange}
                onBlur={() => markTouched("adresse")}
                style={fieldErrorStyle(showError("adresse"))}
              />
              {showError("adresse") && (
                <small style={{ color: "#d93025" }}>{errors.adresse}</small>
              )}
            </div>
          </div>
          <div className="checkout-form__item">
            <h4>Remarque</h4>
            <div className="box-field box-field__textarea">
              <textarea
                className="form-control"
                placeholder="Remarque de commande (facultatif)"
                aria-label="Remarque de commande"
                value={data.note}
                name="note"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="checkout-buttons">
            <button
              type="button"
              onClick={handleNextClick}
              className="btn btn-icon btn-next"
            >
              Suivant <i className="icon-arrow" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
