export const CheckoutStep3 = () => {
  return (
    <>
      {/* <!-- CHECKOUT ÉTAPE TROIS -->  */}
      <div className='checkout-purchase checkout-form'>
        <h4>
          Wakeup vous remercie
          <br />
          pour votre achat !
        </h4>
        <p>
        <p>
          Votre commande a été créée avec succès. Nous vous enverrons un email de confirmation contenant les détails de votre commande. 
          Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Merci pour votre confiance et à bientôt sur Wakeup !
        </p>
        </p>
        <ul className='checkout-purchase__list'>
          <li>
            <span>Numéro de commande</span>B-125724_75
          </li>
          <li>
            <span>Statut de la commande</span>En attente de paiement
          </li>
          <li>
            <span>Réservé jusqu'au</span>22.09.2020
          </li>
          <li>
            <span>Date prévue de chargement</span>20.09.2020
          </li>
        </ul>
        <a href='#' className='checkout-purchase__link'>
          imprimer un document -
        </a>
      </div>
      {/* <!-- CHECKOUT ÉTAPE TROIS FIN -->  */}
    </>
  );
};
