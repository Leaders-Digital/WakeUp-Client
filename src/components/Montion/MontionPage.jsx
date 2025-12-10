import React from "react";

const MontionPage = () => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        backgroundColor: "#fff",
        lineHeight: "1.6",
      }}
    >
      <p>
        <strong>Nom de l'entreprise :</strong>Leaders Makeup
      </p>
      <p>
        <strong>Forme juridique :</strong> SARL
      </p>
      <p>
        <strong>Adresse du siège social :</strong> Cité des Pins, Les berges du
        lac 2 1053 Tunis, Tunisie
      </p>
      <p>
        <strong>Numéro d'inscription :</strong> 1767448X{" "}
      </p>
      <p>
        <strong>Numéro de TVA :</strong> 000MA1767448/X
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>
        Responsable de la Publication
      </h3>
      <p>
        <strong>Nom :</strong> OMAR CHAHED{" "}
      </p>
      <p>
        <strong>Email :</strong> contact@leaders-makeup.com
      </p>
      <p>
        <strong>Telephone :</strong> +216 27 246 380
      </p>
      <h3 style={{ color: "#333", marginTop: "20px" }}>Hébergement du Site</h3>
      <p>
        <strong>Nom de l'hébergeur :</strong> OVHCLOUD
      </p>
      <p>
        <strong>Adresse :</strong> Les Berges du lac, El Kram, Tunis, 1053
        Tunisie
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>
        Propriété Intellectuelle
      </h3>
      <p>
        Tous les contenus présents sur le site (textes, images, logos, etc.)
        sont la propriété de leaders MakeUp ou de leurs propriétaires
        respectifs.
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>Responsabilité</h3>
      <p>
        [Nom de votre entreprise] ne saurait être tenu responsable des dommages
        directs ou indirects résultant de l'accès ou de l'utilisation du site.
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>Données Personnelles</h3>
      <p>
        Référez-vous à notre{" "}
        <a href="/policy" style={{ color: "#0066cc", textDecoration: "none" }}>
          Politique de Confidentialité
        </a>{" "}
        pour plus d'informations sur la gestion des données personnelles.
      </p>

      <h3 style={{ color: "#333", marginTop: "20px" }}>Droit Applicable</h3>
      <p>
        Les présentes mentions légales sont régies par le droit tunisien. Tout
        litige sera soumis aux tribunaux compétents de <strong> TUNIS</strong>.
      </p>
    </div>
  );
};

export default MontionPage;
