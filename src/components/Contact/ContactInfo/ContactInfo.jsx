import socialData from 'data/social';

export const ContactInfo = () => {
  const footerSocial = [...socialData];
  return (
    <>
      {/* <!-- BEGIN CONTACTS INFO --> */}
      <div className='contacts-info'>
        <div className='wrapper'>
          <div className='contacts-info__content'>
            <div className='contacts-info__text'>
              <h4>Nous prenons soin de vous</h4>
              <p>
                Envoyez-nous un e-mail si vous avez des questions, nous nous
                ferons un plaisir de vous contacter et de trouver une solution.
                De plus, nos responsables vous aideront à choisir le produit
                qui vous convient le mieux, au meilleur prix. D'année en année,
                le réseau BeShop se développe et s'améliore, en tenant compte
                de tous les besoins des consommateurs et des tendances du
                marché. Mais pour nous, la préoccupation demeure que lors de
                leur venue au magasin BeShop, les clients n'aient pas de
                questions sur la commodité et le confort des achats, la qualité
                des produits et le niveau de professionnalisme des
                conseillers de vente.
              </p>
            </div>
            <div className='contacts-info__social'>
              <span>Trouvez-nous ici :</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a href={social.path} target='_blank'>
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACTS INFO EOF   -->  */}
    </>
  );
};
