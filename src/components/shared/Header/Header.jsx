import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import useWindowSize from "components/utils/windowSize/windowSize";
import { header, navItem } from "data/data.header";
import Link from "next/link";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useRef, useState } from "react";
import { Nav } from "./Nav/Nav";
import socialData from "data/social";
import axios from "axios";
import OneResult from "./OneResult";

export const Header = () => {
  const { cart } = useContext(CartContext);
  const [promo, setPromo] = useState(true);
  const [fixedNav, setFixedNav] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTouched, setSearchTouched] = useState(false);
  const [height] = useWindowSize();
  const footerSocial = [...socialData];
  const searchRef = useRef(null);
  const requestIdRef = useRef(0);

  const cartItemCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  useEffect(() => {
    const isSticky = () => {
      const scrollTop = window.scrollY;
      setFixedNav(scrollTop > 10);
    };
    window.addEventListener("scroll", isSticky);
    return () => window.removeEventListener("scroll", isSticky);
  }, []);

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

  // Close search dropdown when clicking outside the container.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search: only fire the API call 300ms after the user stops typing,
  // and ignore stale responses if a new request started in the meantime.
  useEffect(() => {
    if (!searchQuery || !searchQuery.trim()) {
      setSearchResults([]);
      setSearchLoading(false);
      return undefined;
    }

    setSearchLoading(true);
    const currentRequestId = ++requestIdRef.current;

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_KEY}api/product/all`,
          {
            params: { search: searchQuery, limit: 8 },
            headers: { "x-api-key": process.env.NEXT_PUBLIC_KEY },
          }
        );
        if (currentRequestId === requestIdRef.current) {
          setSearchResults(res.data.products || []);
          setSearchLoading(false);
        }
      } catch (error) {
        if (currentRequestId === requestIdRef.current) {
          setSearchResults([]);
          setSearchLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchTouched(true);
    setSearchQuery(event.target.value);
  };

  const onConfirme = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const hasQuery = Boolean(searchQuery && searchQuery.trim());
  const showResultsDropdown = showSearch && hasQuery && searchTouched;

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
              paddingTop: "18px",
              paddingLeft: "20px",
              paddingRight: "40px",
            }}
          >
            <div
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                flex: "1",
              }}
            >
              <a
                href="tel:+21627246374"
                style={{ color: "black", textDecoration: "none" }}
              >
                +216 27 246 374
              </a>
            </div>
            <span style={{ flex: "1", textAlign: "center" }}>
              Commandez en un clic, 100 % en ligne !
            </span>
            <ul
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                flex: "1",
                justifyContent: "flex-end",
              }}
            >
              {footerSocial.map((social, index) => (
                <li key={index}>
                  <a
                    href={social.path}
                    aria-label={social.name || "Lien social"}
                  >
                    <i className={social.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPromo(false)}
              aria-label="Fermer la barre promo"
              className="header-top-close js-header-top-close icon-close"
              style={{
                marginLeft: "10px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            />
          </div>
        )}

        <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
          <div className="heder-logo">
            <Link href="/">
              <a aria-label="Accueil Wakeup Cosmetics">
                <img
                  src={header.logo}
                  alt="Wakeup Cosmetics"
                  style={{ width: "120px" }}
                />
              </a>
            </Link>
          </div>

          <div style={{ right: openMenu ? 0 : -360 }} className="header-box">
            {/* Nav */}
            <Nav navItem={navItem} />
            {/* header options */}
            <ul className="header-options" ref={searchRef}>
              <li style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <div
                  className={`search-container ${showSearch ? "active" : ""}`}
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSearch(true)}
                    aria-label="Rechercher un produit"
                    style={{
                      padding: "5px",
                      border: "3px solid #FCEDEA",
                      borderRadius: "4px",
                      backgroundColor: "#f9f9f9",
                      transition: "all 0.3s ease",
                      opacity: showSearch ? 1 : 0,
                      width: showSearch ? "300px" : "0px",
                    }}
                    placeholder="Entrez votre clé de recherche ..."
                  />

                  {showResultsDropdown && (
                    <div className="search-results">
                      {searchLoading ? (
                        <p style={{ textAlign: "center", color: "#999" }}>
                          Recherche en cours...
                        </p>
                      ) : searchResults.length === 0 ? (
                        <p style={{ textAlign: "center", color: "#999" }}>
                          Aucun produit trouvé
                        </p>
                      ) : (
                        searchResults.map((result, index) => (
                          <OneResult
                            key={result._id || index}
                            result={result}
                            onConfirme={onConfirme}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label={
                    showSearch ? "Fermer la recherche" : "Ouvrir la recherche"
                  }
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <i
                    className="icon-search"
                    style={{ fontSize: "23px" }}
                    aria-hidden="true"
                  ></i>
                </button>
              </li>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "15px",
                }}
              >
                <Link href="/cart">
                  <a
                    aria-label={`Panier (${cartItemCount} article${
                      cartItemCount === 1 ? "" : "s"
                    })`}
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <i
                      className="icon-cart"
                      style={{ fontSize: "23px" }}
                      aria-hidden="true"
                    ></i>
                    {cartItemCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-10px",
                          backgroundColor: "#D47E00",
                          color: "white",
                          borderRadius: "50%",
                          minWidth: "18px",
                          height: "18px",
                          fontSize: "11px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "0 4px",
                          lineHeight: 1,
                        }}
                      >
                        {cartItemCount}
                      </span>
                    )}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="search-block-mobile"
            style={{ gap: "5px", alignItems: "center", marginRight: "50px" }}
          >
            <div className={`search-container ${showSearch ? "active" : ""}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearch(true)}
                aria-label="Rechercher un produit"
                style={{
                  padding: "5px",
                  border: "3px solid #FCEDEA",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s ease",
                  opacity: showSearch ? 1 : 0,
                  width: showSearch ? "100%" : "0px",
                }}
                placeholder="Trouvez votre produit ..."
              />
              {showResultsDropdown && (
                <div className="search-results">
                  {searchLoading ? (
                    <p style={{ textAlign: "center", color: "#999" }}>
                      Recherche en cours...
                    </p>
                  ) : searchResults.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#999" }}>
                      Aucun produit trouvé
                    </p>
                  ) : (
                    searchResults.map((result, index) => (
                      <OneResult
                        key={result._id || index}
                        result={result}
                        onConfirme={onConfirme}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowSearch(!showSearch)}
              aria-label={
                showSearch ? "Fermer la recherche" : "Ouvrir la recherche"
              }
              style={{
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <i
                className="icon-search"
                style={{ color: " #D47E00" }}
                aria-hidden="true"
              ></i>
            </button>
            <Link href="/cart">
              <a
                aria-label={`Panier (${cartItemCount} article${
                  cartItemCount === 1 ? "" : "s"
                })`}
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginLeft: "10px",
                }}
              >
                <i
                  className="icon-cart"
                  style={{ color: "#D47E00", fontSize: "22px" }}
                  aria-hidden="true"
                ></i>
                {cartItemCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      backgroundColor: "#D47E00",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "18px",
                      height: "18px",
                      fontSize: "11px",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                      lineHeight: 1,
                    }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </a>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label={openMenu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={openMenu}
            className={
              openMenu ? "btn-menu js-btn-menu active" : "btn-menu js-btn-menu"
            }
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {[1, 2, 3].map((i) => (
              <span key={i}>&nbsp;</span>
            ))}
          </button>
        </div>
      </header>

      {/* <!-- HEADER EOF   --> */}
      <style jsx>{`
        .search-container {
          display: flex;
          align-items: center;
          flex-direction: column;
          overflow: hidden;
          transition: width 0.3s ease-in-out;
        }
        .header-options {
          position: relative;
        }
        .search-container input {
          transition: width 0.3s ease, opacity 0.3s ease;
        }

        .search-container.active input {
          width: 320px;
          opacity: 1;
        }

        .search-results {
          display: block;
          position: absolute;
          top: 40px;
          left: 0;
          width: 110%;
          background-color: #fff;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          padding: 10px;
          z-index: 10;
          opacity: 1;
          max-height: 400px;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .search-results p {
          margin: 5px 0;
          padding: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .search-results p:hover {
          background-color: #f0f0f0;
        }
      `}</style>
    </>
  );
};
