import socialData from "data/social";
export const DetailBlock = () => {
  const footerSocial = [...socialData];

  return (
    <>
      {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
      <div className="contacts-info">
        <div className="wrapper">
          <div className="contacts-info__content">
            <div className="contacts-info__text">
              <h4>à Propos de nous</h4>
              <p>
                Une marque cosmétique Italienne distribuée exclusivement en
                Tunisie et en Afrique par Leaders Makeup - Leaders Group Elle a
                été fondée en 2018 à Milan et commercialisée principalement en
                Ligne en Europe depuis 2019 (Italie, France, Allemagne, Espagne,
                Hollande, Portugal, Royaume-Uni, Pologne, Géorgie) et en Moyen
                Orient depuis 2020 (Arabie Saoudite, Bahreïn, Emirats Arabes
                Unis).
              </p>
            </div>
            <div className="contacts-info__social">
              <span>Trouvez-nous ici :</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a href={social.path} target="_blank">
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- DETAIL MAIN BLOCK EOF --> */}
    </>
  );
};
