import React from 'react'

function LivraisonPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '20px', backgroundColor: '#fff', lineHeight: '1.6' }}>
      <p>Nous nous engageons à livrer vos commandes dans les délais convenus. Voici les informations relatives à nos options de livraison et les frais associés.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Options de livraison</h3>
      <p>Nous offrons plusieurs options de livraison, y compris standard, express, et retrait en magasin. Veuillez sélectionner l'option qui vous convient lors de la finalisation de la commande.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Délais de livraison</h3>
      <p>Les délais de livraison varient selon l'option choisie et la destination. Généralement, les livraisons standard prennent entre 3 à 7 jours ouvrables.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Frais de livraison</h3>
      <p>Les frais de livraison dépendent de la méthode de livraison sélectionnée et de la destination. Les frais sont calculés automatiquement lors de la commande.</p>

      <h3 style={{ color: '#333', marginTop: '20px' }}>Suivi de commande</h3>
      <p>Une fois votre commande expédiée, vous recevrez un e-mail contenant un numéro de suivi pour suivre l'acheminement de votre colis.</p>
    </div>
  );
}

export default LivraisonPage