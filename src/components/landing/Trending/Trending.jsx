import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import axios from "axios";

const SKELETON_PLACEHOLDERS = [0, 1, 2, 3];

export const Trending = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("FACE");

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/all/home`,
        {
          params: { categorie: selectedCategory },
          headers: { "x-api-key": process.env.NEXT_PUBLIC_KEY },
        }
      );
      setProductData(res.data.products || []);
    } catch (error) {
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  const filterList = [
    {
      name: "Visage",
      value: "FACE",
    },
    {
      name: "Pinceau ",
      value: "Brush",
    },
    {
      name: "Yeux",
      value: "EYES",
    },
    {
      name: "Produits de soin",
      value: "Produits de soin",
    },
    {
      name: "Lèvres",
      value: "LIPS",
    },
  ];

  return (
    <>
      {/* <!-- BEGIN TRENDING --> */}
      <section className="trending">
        <div className="trending-content">
          <SectionTitle
            subTitle="Cosmétiques"
            title="Nouveautés"
            body="Sublimez votre visage avec des produits de maquillage sans toxines. Profitez d'offres irrésistibles."
          />
          <div className="tab-wrap trending-tabs">
            <ul className="nav-tab-list tabs">
              {filterList.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setSelectedCategory(item.value)}
                  className={item.value === selectedCategory ? "active" : ""}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="products-items">
              {loading ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 16,
                    padding: "0 20px",
                  }}
                >
                  {SKELETON_PLACEHOLDERS.map((i) => (
                    <div
                      key={i}
                      style={{
                        background: "#f4f4f4",
                        borderRadius: 8,
                        height: 280,
                        animation: "wakeupSkeletonPulse 1.4s ease-in-out infinite",
                      }}
                    />
                  ))}
                  <style>{`@keyframes wakeupSkeletonPulse { 0%, 100% { opacity: 0.6 } 50% { opacity: 1 } }`}</style>
                </div>
              ) : (
                <ProductsCarousel products={productData} />
              )}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
