import useWindowSize from "components/utils/windowSize/windowSize";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Nav = ({ navItem }) => {
  const router = useRouter();
  const [sub, setSub] = useState(false);
  const [height, width] = useWindowSize();

  useEffect(() => {
    if (height > 768) {
      setSub(false);
    }
  }, [height]);
  return (
    <ul className="header-nav">
      {navItem.map((nav) => (
        <li
          key={nav.path}
          onClick={() => {
            nav.subNav ? setSub(!sub) : "";
          }}
        >
          <Link href={nav.path}>
            <a className={nav.path === router.pathname ? "active" : ""}>
              {nav.name}
            </a>
          </Link>
          {nav.subNav && (
            <ul
              style={{
                width: "600px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                className={sub ? "active" : ""}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  href="/boutique/categorie/MAKE%20UP/FACE"
                  style={{ textAlign: "center" }}
                >
                  FACE
                </a>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/BB%20CREAM">
                    BB CREAM
                  </a>
                </li>

                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/BB%20CREAM">
                    BB CREAM
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/BLUSH">BLUSH</a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/CLEANSER">
                    CLEANSER
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/FACE%20CREAM">
                    FACE CREAM
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/FACE%20SERUM">
                    FACE SERUM
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/FIXER">FIXER</a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/FOUNDATION">
                    FOUNDATION
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/HIGHLIGHTER">
                    HIGHLIGHTER
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/POWDER">POWDER</a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/FACE/PRIMER">PRIMER</a>
                </li>
              </div>

              <div
                className={sub ? "active" : ""}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  className="dropdown-item text-wakeup"
                  href="/boutique/categorie/MAKE%20UP/EYES"
                  style={{ textAlign: "center" }}
                >
                  EYES
                </a>

                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/BROW">BROW</a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/CONCEALER">
                    CONCEALER
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/EYE%20CREAM">
                    EYE CREAM
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/EYEBROW">
                    EYEBROW
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/EYELINER">
                    EYELINER
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/EYESHADOW">
                    EYESHADOW
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/EYES/MASCARA">
                    MASCARA
                  </a>
                </li>
              </div>

              <div
                className={sub ? "active" : ""}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <a
                  className="dropdown-item text-wakeup"
                  href="/boutique/categorie/MAKE%20UP/LIPS"
                  style={{ textAlign: "center" }}
                >
                  LIPS
                </a>

                <li>
                  <a href="/boutique/categorie/MAKE%20UP/LIPS/Lip%20Gloss">
                    Lip Gloss
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/LIPS/Lip%20Liner">
                    Lip Liner
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/LIPS/Lipstick">
                    Lipstick
                  </a>
                </li>
                <li>
                  <a href="/boutique/categorie/MAKE%20UP/LIPS/Stick%20SPF">
                    Stick SPF
                  </a>
                </li>
              </div>
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
