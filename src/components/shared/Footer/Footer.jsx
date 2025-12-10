import footerNavData from "data/footer/footerNav";
import paymentMethodData from "data/footer/payment";
import socialData from "data/social";
import Link from "next/link";
import { NavCol } from "./NavCol/NavCol";

export const Footer = () => {
  const footerLogo = "/assets/img/logo-wakeup.png";

  const footerNav = [...footerNavData];
  const footerSocial = [...socialData];
  const paymentMethods = [...paymentMethodData];

  return (
    <>
      {/* <!-- BEGIN FOOTER --> */}
      <footer className="footer" style={{ background: "white" }}>
        <div className="wrapper">
          <div className="footer-top">
            <div className="footer-top__logo">
              <Link href="/">
                <a>
                  <img
                    src={footerLogo}
                    className="js-img"
                    alt=""
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
                    <a href={social.path}>
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment method */}
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
                  <i className="icon-map-pin"></i>
                  <span style={{ color: "#999999", fontWeight: "500" }}>
                    Les berges du lac 2 - Cité les Pins, En face clinique
                    Hannibal
                  </span>
                </li>
                <li>
                  <i className="icon-smartphone"></i>
                  <span className="footer-nav__col-phones">
                    <a href="tel:+21626644400" style={{ fontSize: "16px" }}>
                      +216 27 246 380
                    </a>
                    <a href="tel:+21627360067" style={{ fontSize: "16px" }}>
                      +216 27 360 073
                    </a>
                  </span>
                </li>
                <li>
                  <i className="icon-mail"></i>
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
