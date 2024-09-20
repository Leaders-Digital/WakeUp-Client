import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import productData from "data/product/product";
import axios from "axios";

export const Trending = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("FACE");

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:7000/api/product/all/home",
        {
          params: {
            categorie: selectedCategory,
          },
        }
      );
      console.log(res.data.products);

      setProductData(res.data.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  useEffect(() => {
    getProducts();
  }, []);

  const filterList = [
    {
      name: "Visage",
      value: "FACE",
    },
    {
      name: "Brosse",
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
            title="Produits tendance"
            body="Découvrez les produits les plus vendus de notre boutique."
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
              <ProductsCarousel products={productData} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- TRENDING EOF   --> */}
    </>
  );
};
