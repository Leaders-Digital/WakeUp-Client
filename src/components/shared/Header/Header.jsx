import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "components/utils/windowSize/windowSize";
import { header, navItem } from "data/data.header";
import Link from "next/link";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import socialData from "data/social";
export const Header = () => {
  const { cart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [height, width] = useWindowSize();
  const footerSocial = [...socialData];
  // For Fixed nav
  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  });

  const isSticky = () => {
    const scrollTop = window.scrollY;
    if (scrollTop > 10) {
      setFixedNav(true);
    } else {
      setFixedNav(false);
    }
  };

  useEffect(() => {
    if (openMenu) {
      if (height < 767) {
        disableBodyScroll(document);
      } else {
        enableBodyScroll(document);
      }
    } else {
      enableBodyScroll(document);
    }
  }, [openMenu, height]);
  return (
    <>
      {/* <!-- BEGIN HEADER --> */}
      <header className="header">
        {promo && (
        <div
        className="header-top"
        style={{
          background: "#D47E00",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "40px",
        }}
      >
        <div style={{ color: "black", display: "flex", alignItems: "center", flex: "1" }}>
          <span href="tel:+21626644400">+216 26 644 400</span>
        </div>
        <span style={{ flex: "1", textAlign: "center" }}>Réveillez votre beauté naturelle</span>
        <ul style={{ display: "flex", flexDirection: "row", gap: "10px", flex: "1", justifyContent: "flex-end" }}>
          {footerSocial.map((social, index) => (
            <li key={index}>
              <a href={social.path}>
                <i className={social.icon}></i>
              </a>
            </li>
          ))}
        </ul>
        <i
          onClick={() => setPromo(false)}
          className="header-top-close js-header-top-close icon-close"
          style={{ marginLeft: "10px" }}
        ></i>
      </div>
      
        )}
        <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
          <div className="heder-logo">
            <Link href="/">
              <a>
                <img src={header.logo} alt="" style={{ width: "120px" }} />
              </a>
            </Link>
          </div>
          <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
          </div>

          <div
            onClick={() => setOpenMenu(!openMenu)}
            className={
              openMenu ? "btn-menu js-btn-menu active" : "btn-menu js-btn-menu"
            }
          >
            {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))}
          </div>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
    </>
  );
};
