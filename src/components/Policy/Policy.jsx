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
    <div style={styles.container}>
      <h2 style={styles.h2}>Politique de Confidentialité pour les Utilisateurs</h2>
      <p style={styles.paragraph}>
        Wake Up Srl, dont le siège est situé Foro Buonaparte 70 - 20121 Milan, 
        code fiscal et numéro de TVA 09178910965, et numéro d'inscription au 
        registre des sociétés MI - 2074283 (ci-après dénommé également le "Responsable 
        du traitement des données" ou le "Responsable"), en tant que responsable 
        du traitement des données personnelles des utilisateurs (ci-après les 
        "Utilisateurs") qui naviguent, s'enregistrent et utilisent les services 
        disponibles sur le site web <a href="https://www.wakeup-cosmetics.com" target="_blank" rel="noopener noreferrer" style={styles.a}>https://www.wakeup-cosmetics.com</a> 
        (ci-après, le "Site" et les "Services") fournit ci-dessous les informations 
        de confidentialité conformément à l'article 13 du règlement (UE) 2016/679 
        du 27 avril 2016 (ci-après, le "Règlement" ou également les "Réglementations 
        Applicables").
      </p>

      <h2 style={styles.h2}>Responsable du Traitement des Données</h2>
      <p style={styles.paragraph}>
        L'entreprise désignée en tant que responsable externe du traitement des 
        données collectées et utilisées ici est Gummy Industries SRL, dont le siège 
        est situé Via Dalmazia 19/b, Brescia, numéro de TVA 01276100524 (ci-après 
        dénommée également le "Responsable" ou le "Gestionnaire").
      </p>

      <h2 style={styles.h2}>Services</h2>
      <p style={styles.paragraph}>
        Les Services mentionnés sur le Site sont réservés aux adultes conformément 
        à la législation en vigueur. Le Responsable ne traitera donc pas les données 
        personnelles des mineurs, sauf si les parents ou les responsables légaux 
        ont donné leur consentement. Sur demande des Utilisateurs, le Responsable 
        supprimera rapidement toutes les données personnelles collectées par 
        inadvertance relatives aux mineurs. Pour toute information relative à 
        cette politique de confidentialité, les Utilisateurs peuvent contacter le 
        Responsable à tout moment en utilisant les moyens suivants :
      </p>
      <h3 style={styles.h3}>Pour Gummy Industries Srl</h3>
      <ul style={styles.ul}>
        <li>
          En envoyant une lettre recommandée avec accusé de réception au bureau du 
          Gestionnaire (Via Dalmazia 19/b, Brescia) ;
        </li>
        <li>
          En envoyant un email à : <a href="mailto:info@gummyindustries.com" style={styles.a}>info@gummyindustries.com</a>
        </li>
      </ul>
      <h3 style={styles.h3}>Pour le Responsable :</h3>
      <ul style={styles.ul}>
        <li>
          En envoyant une lettre recommandée avec accusé de réception au siège 
          social de Wake Up Srl (Foro Buonaparte 70 - 20121 Milan) ;
        </li>
        <li>
          En envoyant un email à : <a href="mailto:customercare@wakeup-cosmetics.com" style={styles.a}>customercare@wakeup-cosmetics.com</a>
        </li>
      </ul>

      <h2 style={styles.h2}>Objectif du Traitement</h2>
      <p style={styles.paragraph}>
        Les données personnelles des Utilisateurs seront traitées de manière licite 
        par le Responsable conformément à l'article 6 du Règlement pour les 
        finalités suivantes :
      </p>
      <ul style={styles.ul}>
        <li>
          <strong>Obligations contractuelles et fourniture des services</strong> 
          (base légale) : permettre l'achat de produits et l'exécution des 
          Services, ainsi que l'exécution des Conditions d'utilisation du Site, 
          acceptées par l'Utilisateur lors de l'utilisation des Services, et 
          répondre à des demandes spécifiques de l'Utilisateur.
        </li>
        <li>
          <strong>Finalités Administratives et Comptables</strong> (base légale 
          intérêt légitime du Responsable) : mener des activités organisationnelles, 
          administratives, financières et comptables.
        </li>
        <li>
          <strong>Obligations légales</strong> (base légale obligation légale) : 
          respecter les obligations légales établies par la loi.
        </li>
      </ul>

      <h2 style={styles.h2}>Droits des Utilisateurs</h2>
      <p style={styles.paragraph}>
        Les Utilisateurs peuvent exercer les droits qui leur sont accordés par les 
        Réglementations Applicables en contactant le Responsable par l'un des moyens 
        suivants :
      </p>
      <ul style={styles.ul}>
        <li>
          En envoyant une lettre recommandée avec accusé de réception au Responsable : 
          Wake Up Srl (Foro Buonaparte 70 - 20121 Milan)
        </li>
        <li>
          En envoyant un email à : <a href="mailto:customercare@wakeup-cosmetics.com" style={styles.a}>customercare@wakeup-cosmetics.com</a>
        </li>
      </ul>
      <p>Les Utilisateurs ont les droits suivants :</p>
      <ul style={styles.ul}>
        <li>Accès aux données traitées (art. 15 du Règlement) ;</li>
        <li>Rectification (art. 16 du Règlement) ;</li>
        <li>Suppression des données (art. 17 du Règlement) ;</li>
        <li>Limitation du traitement (art. 18 du Règlement) ;</li>
        <li>Notification des corrections ou suppressions aux destinataires (art. 19 du Règlement) ;</li>
        <li>Portabilité des données (art. 20 du Règlement) ;</li>
        <li>Opposition au traitement des données (art. 21 du Règlement).</li>
      </ul>

      <h2 style={styles.h2}>Cookies</h2>
      <p style={styles.paragraph}>
        Le Site utilise des cookies. Pour plus d'informations et pour consulter 
        les informations détaillées, les Utilisateurs peuvent se référer à la 
        Politique en matière de cookies.
      </p>

      <p style={styles.paragraph}>
        Pour toute question concernant le traitement des données collectées, le 
        Responsable est disponible pour toute discussion. Les Utilisateurs ont 
        également le droit de déposer une plainte auprès de l'Autorité de Protection 
        des Données.
      </p>
    </div>
  );
};

export default Policy;
