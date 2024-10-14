import React from 'react'

const CookiesPage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', lineHeight: '1.6' }}>
      <p>Cette politique explique comment nous utilisons les cookies et technologies similaires lorsque vous visitez notre site web.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Qu'est-ce qu'un cookie ?</h3>
      <p>Un cookie est un fichier texte stocké sur votre appareil pour améliorer votre expérience sur notre site web.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Utilisation des cookies</h3>
      <p>Nous utilisons des cookies pour analyser le trafic sur notre site, personnaliser votre expérience et vous proposer des publicités ciblées.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Gestion des cookies</h3>
      <p>Vous pouvez désactiver les cookies via les paramètres de votre navigateur, mais cela peut limiter certaines fonctionnalités du site.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Cookies tiers</h3>
      <p>Nous pouvons permettre à des partenaires tiers d'utiliser des cookies pour améliorer nos services et vous proposer des offres personnalisées.</p>
    </div>
  );
}

export default CookiesPage