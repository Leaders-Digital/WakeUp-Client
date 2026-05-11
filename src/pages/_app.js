import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import "../styles/styles.scss";
import FacebookPixel from "lib/FacebookPixel";

export const CartContext = createContext();
export const PromoContext = createContext();

const CART_STORAGE_KEY = "wakeup_cart_v1";

const MyApp = ({ Component, pageProps }) => {
  const [promo, setPromo] = useState(null);
  /** Normalized CNRPS number when the cart passed server validation (sent again at checkout). */
  const [cnrpsCode, setCnrpsCode] = useState(null);
  /** Available CNRPS purchase types returned by the server (direct_comptant / compte_amicale). */
  const [cnrpsOptions, setCnrpsOptions] = useState([]);
  /** Purchase type chosen by the buyer after eligibility was confirmed. */
  const [cnrpsPurchaseType, setCnrpsPurchaseType] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartHydrated, setCartHydrated] = useState(false);

  // Hydrate cart from localStorage on mount so it survives page refreshes.
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch (err) {
      // Ignore corrupted storage; start with empty cart.
    } finally {
      setCartHydrated(true);
    }
  }, []);

  // Persist cart to localStorage on every change (after initial hydration).
  useEffect(() => {
    if (!cartHydrated) return;
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      // Quota exceeded or storage disabled — ignore.
    }
  }, [cart, cartHydrated]);

  return (
    <PromoContext.Provider
      value={{
        promo,
        setPromo,
        cnrpsCode,
        setCnrpsCode,
        cnrpsOptions,
        setCnrpsOptions,
        cnrpsPurchaseType,
        setCnrpsPurchaseType,
      }}
    >
      <CartContext.Provider value={{ cart, setCart }}>
        <Head>
          <title>Wakeup Cosmetics</title>
          <meta
            name="description"
            content="Maquillage tunisien testé dermatologiquement — livraison en 24h. Découvrez les produits Wakeup Cosmetics."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <FacebookPixel />
        <Component {...pageProps} />
      </CartContext.Provider>
    </PromoContext.Provider>
  );
};

export default MyApp;
