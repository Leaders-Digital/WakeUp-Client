import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "components/utils/windowSize/windowSize";
import { header, navItem } from "data/data.header";
import Link from "next/link";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";

export const Header = () => {
  const { cart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [height, width] = useWindowSize();

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
          <div className="header-top" style={{background:"#D47E00",padding:"12px"}}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
              }}
            >
              Réveillez votre beauté naturelle
              <h6></h6>
              <img
                src="https://www.countryflags.com/wp-content/uploads/tunisia-flag-png-xl.png"
                alt=""
                style={{ width: "20px", marginLeft: "5px" }}
              />
              <img
                src="https://www.countryflags.com/wp-content/uploads/italy-flag-png-large.png"
                alt=""
                style={{ width: "20px", marginLeft: "5px" }}
              />
            </span>

            <i
              onClick={() => setPromo(false)}
              className="header-top-close js-header-top-close icon-close"
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
