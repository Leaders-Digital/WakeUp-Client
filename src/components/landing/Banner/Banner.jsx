import { useEffect, useState } from "react";
import Link from "next/link";
// import banner from "assets/img/banner.jpg";
export const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    `url("https://c4.wallpaperflare.com/wallpaper/864/934/398/4k-screenshot-assetto-corsa-competizione-wallpaper-thumb.jpg")`
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setBackgroundImage(
          `url("/assets/img/logo-wakeup.png")`
        );
      } else {
        setBackgroundImage(
          `url("/assets/img/banner.jpg")`
        );
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
  }, []);

  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div
        className="main-block load-bg"
        style={{ backgroundImage }}
      >
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
