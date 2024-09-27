import { createContext, useState } from "react";
import "../styles/styles.scss";
import Link from "next/link";

export const CartContext = createContext();

const MyApp = ({ Component, pageProps }) => {
  console.log("API Key:", process.env.NEXT_PUBLIC_API_KEY);

  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <title>Wakeup Cosmetics</title>
      <Component {...pageProps} />
      {/* Cart fixed to top-right corner */}
      <div
        style={{
          padding: "30px",
          position: "fixed", // Change to 'fixed' for consistent positioning
          zIndex: "1000",
          bottom: "0",
          right: "0",
          margin: "7px",
        }}
      >
        <li>
          <Link href="/cart">
            <a>
              <i
                className="icon-cart"
                style={{ fontSize: "30px", color: "black" }}
              ></i>
              <span
                style={{
                  // camelCase property names
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#d05278",
                }}
              >
                {cart.length ?? "0"}
              </span>
            </a>
          </Link>
        </li>
      </div>
    </CartContext.Provider>
  );
};

export default MyApp;
