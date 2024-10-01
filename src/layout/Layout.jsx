import { Header } from "../components/shared/Header/Header";
import { Insta } from "components/shared/Insta/Insta";
import { Footer } from "components/shared/Footer/Footer";
import { motion } from "framer-motion";
export const Layout = ({ children }) => {
  return (
    <>
      <header className="header">
        <Header />
      </header>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <main className="content">
          {children}
          <Insta />
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </motion.div>
    </>
  );
};
