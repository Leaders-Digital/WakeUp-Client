import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { getImageUrl } from "utils/imageUrl";

export const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [banners, setBanners] = useState({});

  const getBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/banner/object`,
        {
          headers: { "x-api-key": process.env.NEXT_PUBLIC_KEY },
        }
      );
      setBanners(response.data);
    } catch (error) {
      // Silently fail — fallback colors will show.
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  useEffect(() => {
    const pickBanner = () => {
      const mainBannerUrl = banners.mainBanner
        ? getImageUrl(banners.mainBanner.replace(/\\/g, "/"))
        : "";
      const miniMainBannerUrl = banners.miniMainBanner
        ? getImageUrl(banners.miniMainBanner.replace(/\\/g, "/"))
        : "";

      if (typeof window === "undefined") return;
      if (window.innerWidth < 480 && miniMainBannerUrl) {
        setBackgroundImage(`url(${miniMainBannerUrl})`);
      } else if (mainBannerUrl) {
        setBackgroundImage(`url(${mainBannerUrl})`);
      }
    };

    pickBanner();
    window.addEventListener("resize", pickBanner);
    return () => window.removeEventListener("resize", pickBanner);
  }, [banners]);

  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className="main-block load-bg" style={{ backgroundImage }}>
        <div className="wrapper">
          <div className="main-block__content">
            <h1 className="saint-text" style={{ color: "#D47E00" }}>
              DES COULEURS ,
            </h1>
            <h1 className="main-text" style={{ color: "#cf7902" }}>
              QUI VOUS FONT BRILLER.
            </h1>
            <p
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              Maquillage tunisien testé dermatologiquement — livraison en 24h,
              paiement à la livraison.
            </p>
            <p>
              Sublimez votre beauté avec des couleurs vibrantes et des textures
              innovantes. Maquillage longue tenue, pigments intenses, formules
              ultra-confortables – pour un look qui vous ressemble !
            </p>

            <Link href="/shop">
              <a className="btn" style={{ background: "#D47E00" }}>
                Commandez maintenant !
              </a>
            </Link>
          </div>
        </div> 
         <img
          className="main-block__decor"
          src="/assets/img/main-block-decor.png"
          alt=""
          role="presentation"
        /> 
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
