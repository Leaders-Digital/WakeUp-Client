import React from "react";

const Policy = () => {
  const styles = {
    container: {
      lineHeight: 1.6,
      margin: '20px',
      width:"70%",
      marginLeft:"auto",
      marginRight:"auto",
    },
    h1: {
      fontSize: '2.5em',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2em',
      marginTop: '30px',
      marginBottom: '15px',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.5em',
      marginTop: '20px',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    paragraph: {
      fontSize: '1em',
      margin: '10px 0',
    },
    ul: {
      listStyleType: 'disc',
      paddingLeft: '20px',
    },
    a: {
      color: '#0066cc',
      textDecoration: 'none',
    },
    aHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', lineHeight: '1.6' }}>
     
      <p>Nous attachons une grande importance à la protection de vos données personnelles. Cette politique explique comment vos informations sont collectées, utilisées et protégées.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Collecte de données</h3>
      <p>Nous collectons des informations lorsque vous créez un compte, passez une commande ou interagissez avec notre site web.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Utilisation des données</h3>
      <p>Vos données sont utilisées pour traiter vos commandes, améliorer votre expérience utilisateur et, si vous le souhaitez, vous envoyer des offres promotionnelles.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Protection des données</h3>
      <p>Nous utilisons des mesures de sécurité pour protéger vos données personnelles contre l'accès non autorisé et la divulgation.</      p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Vos droits</h3>
      <p>Vous avez le droit d'accéder, de modifier ou de supprimer vos informations personnelles à tout moment en nous contactant à l'adresse 
       <strong> contact@leaders-makeup.com.</strong>   </p>
    </div>
  );
};

export default Policy;
