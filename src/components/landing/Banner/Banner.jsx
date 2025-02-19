import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState(""); // State to store the background image
  const [banners, setBanners] = useState({});

  // Function to fetch the banner data
  const getBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/banner/object`, // Data being sent in the body of the request
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );
      setBanners(response.data); // Set banners with the response data
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Ensure that the path is properly formatted with forward slashes
      const mainBannerUrl = banners.mainBanner
        ? `${process.env.NEXT_PUBLIC_API_KEY}${banners.mainBanner.replace(
            /\\/g,
            "/"
          )}`
        : ``;

      const miniMainBannerUrl = banners.miniMainBanner
        ? `${process.env.NEXT_PUBLIC_API_KEY}${banners.miniMainBanner.replace(
            /\\/g,
            "/"
          )}`
        : ``;

      // Use miniMainBanner if screen width is less than 480px, otherwise use mainBanner
      if (window.innerWidth < 480) {
        setBackgroundImage(`url(${miniMainBannerUrl})`);
      } else {
        setBackgroundImage(`url(${mainBannerUrl})`);
      }
    };

    // Set initial image based on window size
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [banners]); // Re-run this effect whenever banners change

  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className="main-block load-bg" style={{ backgroundImage }}>
        <div className="wrapper">
          <div
            className="main-block__content"
            // style={{ fontFamily: "Better Grade" }}
          >
            <h1 className="saint-text" style={{ color: "#D47E00" }}>
              DES COULEURS ,
            </h1>
            <h1 className="main-text" style={{ color: "#D47E00" }}>
              {" "}
              QUI VOUS FONT BRILLER.
            </h1>
            <p>
              Sublimez votre beauté avec des couleurs vibrantes et des textures
              innovantes. Maquillage longue tenue, pigments intenses, formules
              ultra-confortables – pour un look qui vous ressemble !
            </p>
            {/* <p>à partir de 60 DT !</p> */}

            <Link href="/shop">
              <a className="btn" style={{ background: "#D47E00" }}>
                Explorer notre gamme !
              </a>
            </Link>
          </div>
        </div>
        {/* <img
          className="main-block__decor"
          src="/assets/img/main-block-decor.png"
          alt=""
        /> */}
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
