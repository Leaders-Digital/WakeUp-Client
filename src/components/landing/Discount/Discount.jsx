import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export const Discount = () => {
  const [banners, setBanners] = useState({});

  // Function to fetch the banner data
  const getBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/banner/object`,  // Data being sent in the body of the request
        {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY, // Send the API key in the request header
          },
        }
      );
      setBanners(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBanner();
  }, []);

  // Ensure that the path is properly formatted with forward slashes
  const contactBannerUrl = banners.promo
    ? `${process.env.NEXT_PUBLIC_API_KEY}${banners.promo.replace(/\\/g, '/')}`
    : `/assets/img/bannersale2.png`; // Fallback image

  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className="discount js-img"
        style={{ backgroundImage: `url(${contactBannerUrl})` }}
      >
        <div className="wrapper">
          <div className="discount-info">
            <span className="saint-text">Discount</span>
            <span className="main-text">
              Get Your <span>50%</span> Off
            </span>
            <p>
              Nourish your skin with toxin-free cosmetic products. With the
              offers that you can’t refuse.
            </p>

            <Link href="/shop">
              <a className="btn">Get now!</a>
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF --> */}
    </>
  );
};
