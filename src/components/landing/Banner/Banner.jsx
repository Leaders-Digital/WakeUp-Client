import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    `url("/assets/img/banner-mini1.png")`
  );
  const [banners, setBanners] = useState({});

  // Function to fetch the banner data
  const getBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/banner/object`
      );
      console.log(response.data);
      setBanners(response.data); // Set banners with the response data
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
        ? `${process.env.NEXT_PUBLIC_API_KEY}${banners.mainBanner.replace(/\\/g, '/')}`
        : `/assets/img/banner-mini1.png`;

      const miniMainBannerUrl = banners.miniMainBanner
        ? `${process.env.NEXT_PUBLIC_API_KEY}${banners.miniMainBanner.replace(/\\/g, '/')}`
        : `/assets/img/banner-mini1.png`;

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
          <div className="main-block__content">
            <span className="saint-text">Professionnel</span>
            <h1 className="main-text">Beauté &amp; Soin</h1>
            <p>
              Nourrissez votre peau avec des produits cosmétiques sans toxines.
              Avec des offres que vous ne pouvez pas refuser.
            </p>

            <Link href="/shop">
              <a className="btn">Achetez maintenant</a>
            </Link>
          </div>
        </div>
        <img
          className="main-block__decor"
          src="/assets/img/main-block-decor.png"
          alt=""
        />
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
