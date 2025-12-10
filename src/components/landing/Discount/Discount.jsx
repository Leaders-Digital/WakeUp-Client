import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl } from "utils/imageUrl";

export const Discount = () => {
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
    ? getImageUrl(banners.promo.replace(/\\/g, "/"))
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
            <span className="main-text">
              Découvrez <span>nos packs exclusifs</span>
            </span>
            <p>
              Profitez de nos offres irrésistibles et explorez nos packs
              soigneusement sélectionnés pour répondre à tous vos besoins.
            </p>

            <Link href="/packs">
              <a className="btn">Voir les packs</a>
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF --> */}
    </>
  );
};
