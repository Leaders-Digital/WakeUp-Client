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
  const [showSearch, setShowSearch] = useState(false); // State to control search visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to control input text
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [height, width] = useWindowSize();
  const footerSocial = [...socialData];
  const searchRef = useRef(null); // Ref for the search container

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

  // Effect to handle click outside the search input
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setShowSearch(false);
  //       setSearchQuery(""); // Clear the search query when hiding
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/all`,
        {
          params: {
            search: searchQuery,
          },
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );
      setSearchResults(res.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [searchQuery]);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const onConfirme = () => {
    setSearchQuery("");
  };
  console.log(searchQuery);

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
            <div
              style={{
                color: "black",
                display: "flex",
                alignItems: "center",
                flex: "1",
              }}
            >
              <span href="tel:+21626644400">+216 26 644 400</span>
            </div>
            <span style={{ flex: "1", textAlign: "center" }}>
              Réveillez votre beauté naturelle
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

                  <div className="search-results">
                    {searchResults.map((result, index) => (
                      <OneResult
                        key={index}
                        result={result}
                        onConfirme={onConfirme}
                      />
                    ))}
                  </div>
                </div>
                <a onClick={() => setShowSearch(!showSearch)}>
                  <i className="icon-search" style={{ cursor: "pointer" , fontSize:"23px"}} ></i> 
                </a>
              </li>
            </ul>
          </div>
          <div className="search-block-mobile" style={{ gap: "5px", alignItems: "center",marginRight:"50px" }}>
            <div className={`search-container ${showSearch ? "active" : ""}`}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSearch(true)}
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                  transition: "all 0.3s ease",
                  opacity: showSearch ? 1 : 0,
                  width: showSearch ? "100%" : "0px",
              
                }}
                placeholder="Search..."
              />

              <div className="search-results">
                {searchResults.map((result, index) => (
                  <OneResult
                    key={index}
                    result={result}
                    onConfirme={onConfirme}
                  />
                ))}
              </div>
            </div>
            <a onClick={() => setShowSearch(!showSearch)}>
              <i className="icon-search" style={{ cursor: "pointer" ,  color:" #de8c06" }}></i>
            </a>
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
          display: ${showSearch && searchQuery ? "block" : "none"};
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
