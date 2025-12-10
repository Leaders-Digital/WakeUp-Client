import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { getImageUrl } from "utils/imageUrl";

export const Breadcrumb = ({ breadcrumb, title, description }) => {
  const router = useRouter();
  const [banners, setBanners] = useState("");

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
  const breadcrumbBannerUrl = banners.Breadcrumb
    ? getImageUrl(banners.Breadcrumb.replace(/\\/g, "/"))
    : `/assets/img/default-banner.png`; // Fallback image

  return (
    <>
      {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
      <div
        className="detail-block detail-block_margin"
        style={{ backgroundImage: `url(${breadcrumbBannerUrl})` }}
      >
        <div className="wrapper">
          <div className="detail-block__content">
            <h1>{title}</h1>
            {breadcrumb && (
              <ul className="bread-crumbs">
                {breadcrumb?.map(({ path, label }, i) => {
                  return (
                    <React.Fragment key={i}>
                      {path === router.asPath ? (
                        <li className="bread-crumbs__item">{label}</li>
                      ) : (
                        <li className="bread-crumbs__item">
                          <Link href={path}>
                            <a className="bread-crumbs__link">{label}</a>
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}

            {/* IF NEED DESCRIPTION */}
            {description && <span className="error-descr">{description}</span>}
          </div>
        </div>
      </div>
      {/* <!-- DETAIL MAIN BLOCK EOF   --> */}
    </>
  );
};
