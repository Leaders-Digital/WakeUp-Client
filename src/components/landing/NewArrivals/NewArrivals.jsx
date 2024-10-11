import axios from "axios";
import { ProductsCarousel } from "components/Product/Products/ProductsCarousel";
import { SectionTitle } from "components/shared/SectionTitle/SectionTitle";
import productData from "data/product/product";
import { useEffect, useState } from "react";

export const NewArrivals = () => {
  const [productData, setProductData] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/all/home`,
        {
          params: {
            categorie: "FACE",
          },
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_KEY, // Ensure this is the correct reference
          },
        }
      );
  
      setProductData(res.data.products);
    } catch (error) {
      console.error(error); // Log error for better debugging
    }
  };
  
  
  
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      {/* <!-- BEGIN NEW ARRIVALS --> */}
      <section className="arrivals">
        <SectionTitle
          subTitle="Maquillage"
          title="Nouveautés"
          body="Sublimez votre visage avec des produits de maquillage sans toxines. Profitez d'offres irrésistibles."
        />
        <div className="products-items">
          <ProductsCarousel products={productData} />
        </div>
      </section>
      {/* <!-- NEW ARRIVALS EOF --> */}
    </>
  );
};
