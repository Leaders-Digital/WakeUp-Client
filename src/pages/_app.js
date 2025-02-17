import { createContext, useState } from "react";
import "../styles/styles.scss";
import Link from "next/link";
import FacebookPixel from "lib/FacebookPixel";

export const CartContext = createContext();
export const PromoContext = createContext();
const MyApp = ({ Component, pageProps }) => {
  const [promo, setPromo] = useState(null);
  const [cart, setCart] = useState([]);

  console.log = () => {};
  console.error = () => {};

  return (
    <PromoContext.Provider value={{ promo, setPromo }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <title>Wakeup Cosmetics</title>
        <FacebookPixel />
        <Component {...pageProps} />
        {/* Cart fixed to top-right corner */}
        <div
          className="cardIcon"
          style={
            cart.length > 0
              ? {
                  display: "block",
                  padding: "10px",
                  position: "fixed", // Change to 'fixed' for consistent positioning
                  zIndex: "1000",
                  bottom: "0",
                  right: "0",
                  margin: "30px",
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
                }
              : {
                  display: "none",
                  padding: "10px",
                  position: "fixed", // Change to 'fixed' for consistent positioning
                  zIndex: "1000",
                  bottom: "0",
                  right: "0",
                  margin: "30px",
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;",
                }
          }
        >
          <li style={{ position: "relative" }}>
            <Link href="/cart">
              <a>
                <i className="icon-cart" style={{ fontSize: "30px" }}></i>
                <span
                  style={{
                    // camelCase property names
                    fontWeight: "700",
                    fontSize: "16px",
                    color: "#de86a0",
                    position: "absolute",
                    backgroundColor: "white",
                    border: "2px solid #eee",
                    padding: "5px",
                    borderRadius: "50%",
                    top: "-10px",
                    transitionDuration: "0.5s",
                  }}
                >
                  {cart.length ?? "0"}
                </span>
              </a>
            </Link>
          </li>
        </div>
      </CartContext.Provider>
    </PromoContext.Provider>
  );
};

export default MyApp;
