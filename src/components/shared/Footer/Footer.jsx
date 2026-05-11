import footerNavData from "data/footer/footerNav";
import socialData from "data/social";
import Link from "next/link";
import { NavCol } from "./NavCol/NavCol";

export const Footer = () => {
  const footerLogo = "/assets/img/logo-wakeup.png";

  const footerNav = [...footerNavData];
  const footerSocial = [...socialData];

  return (
    <>
      {/* <!-- BEGIN FOOTER --> */}
      <footer className="footer" style={{ background: "white" }}>
        <div className="wrapper">
          <div className="footer-top">
            <div className="footer-top__logo">
              <Link href="/">
                <a aria-label="Accueil Wakeup Cosmetics">
                  <img
                    src={footerLogo}
                    className="js-img"
                    alt="Wakeup Cosmetics"
                    style={{ width: "150px" }}
                  />
                </a>
              </Link>
            </div>
            <div className="footer-top__social">
              <span>Retrouvez-nous ici:</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.path}
                      aria-label={social.name || "Lien social"}
                      rel="noopener noreferrer"
                    >
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust signals: shipping, payment and return info */}
          <div
            className="footer-trust"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 24,
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
              padding: "24px 0",
              marginBottom: 24,
            }}
          >
            <div style={{ minWidth: 220 }}>
              <strong style={{ display: "block", marginBottom: 6 }}>
                Livraison rapide
              </strong>
              <span style={{ color: "#666", fontSize: 14 }}>
                24-48h partout en Tunisie · 8 TND
              </span>
            </div>
            <div style={{ minWidth: 220 }}>
              <strong style={{ display: "block", marginBottom: 6 }}>
                Paiement sécurisé
              </strong>
              <span style={{ color: "#666", fontSize: 14 }}>
                Paiement à la livraison ou en ligne via Konnect
              </span>
            </div>
            <div style={{ minWidth: 220 }}>
              <strong style={{ display: "block", marginBottom: 6 }}>
                Retours faciles
              </strong>
              <span style={{ color: "#666", fontSize: 14 }}>
                Retours acceptés sous 7 jours
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                minWidth: 220,
              }}
            >
              <strong>Nous acceptons :</strong>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <li
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#1a1f71",
                    background: "white",
                  }}
                >
                  VISA
                </li>
                <li
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#eb001b",
                    background: "white",
                  }}
                >
                  MasterCard
                </li>
                <li
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#D47E00",
                    background: "white",
                  }}
                >
                  e-DINAR
                </li>
                <li
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#222",
                    background: "white",
                  }}
                >
                  Konnect
                </li>
                <li
                  style={{
                    padding: "4px 8px",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#222",
                    background: "white",
                  }}
                >
                  Espèces à la livraison
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-nav">
            {/* Footer Nav */}
            {footerNav.map((nav, index) => (
              <NavCol nav={nav} key={index} />
            ))}
            <div className="footer-nav__col">
              <span className="footer-nav__col-title">Contact</span>
              <ul>
                <li>
                  <i className="icon-map-pin" aria-hidden="true"></i>
                  <span style={{ color: "#999999", fontWeight: "500" }}>
                    Les berges du lac 2 - Cité les Pins, En face clinique
                    Hannibal
                  </span>
                </li>
                <li>
                  <i className="icon-smartphone" aria-hidden="true"></i>
                  <span className="footer-nav__col-phones">
                    <a href="tel:+21627246374" style={{ fontSize: "16px" }}>
                      +216 27 246 374
                    </a>
                  </span>
                </li>
                <li>
                  <i className="icon-mail" aria-hidden="true"></i>
                  <a
                    href="mailto:contact@leaders-makeup.com"
                    style={{ fontSize: "16px", color: "#999999" }}
                  >
                    contact@leaders-makeup.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-copy">
            <span>&copy; Copyright 2024 by LeadersDigital </span>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER EOF   --> */}
    </>
  );
};
