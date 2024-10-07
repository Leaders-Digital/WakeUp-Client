import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
// import productData from "data/product/product";
import Slider from "rc-slider";
import { useEffect, useRef, useState } from "react";
import Dropdown from "react-dropdown";
import axios from "axios";
import { useRouter } from "next/router";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: "asc", label: "Du plus cher au moins cher" },
  { value: "desc", label: "Du moins cher au plus cher" },
];
export const Shop = ({ setTitle }) => {
  const router = useRouter();

  const { category } = router.query;

  const [productData, setProductData] = useState([]);
  const allProducts = [...productData];
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filter, setFilter] = useState({ isNew: false, isSale: false });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lowPrice, setLowprice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [fixMin, setFixMin] = useState(0);
  const [fixMax, setFixMax] = useState(0);
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [mainCategory, setMainCategory] = useState(category);

  const produitdesoin = [
    "Nettoyants",
    "SOIN DE VISAGE",
    "SOIN DE CORPS",
    "SOIN DE CHEVEUX",
  ];
  const Accessoires = [
    "PINCEAUX DE VISAGE",
    "PINCEAUX DES YEUX",
    "PINCEAUX DES LÈVRES",
    "BRUSH CLEANSER",
  ];
  const Maquillage = [
    "FONDATIONS",
    "BB CREAM",
    "BLUSH",
    "HIGHLIGHTER",
    "BRONZER & POWDER",
    "PRIMER",
    "FIXER",
    "MASCARA",
    "CONCEALER",
    "EYESHADOW",
    "EYELINER",
    "EYE PENCILS",
    "EYE BROW",
    "LIPSTICK",
    "LIPGLOSS",
    "LIPLINER",
    "BAUMES",
  ];
  const objecttofind = {
    "Produits de soin": produitdesoin,
    Accessoires: Accessoires,
    Maquillage: Maquillage,
    nocata: [],
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_KEY}api/product/get-category`
      );
      setCategories(res.data.categoryCounts);
    } catch (error) {}
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_KEY}api/product/all`, {
        params: {
          page: page, // Send current page as a query parameter
          limit: 12, // Send limit as a query parameter
          categorie: selectedCategory,
          solde: filter.isSale,
          search: search,
          sortByPrice: sortByPrice,
          searchArray: objecttofind[mainCategory],
        },
      });
      setProductData(res.data.products);
      setFixMin(res.data.lowestPrice);
      setFixMax(res.data.highestPrice);
      setTotalPages(res.data.totalPages); // Update totalPages from the response
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const previewsPage = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = async () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });


  };

  useEffect(() => {
    getProducts();
  },[]);

  useEffect(() => {
        getProducts();
  
   // Cleanup on uount or when search changes
  }, [page, selectedCategory, filter, sortByPrice,search]);

  useEffect(() => {
    if (category) {
      setTitle(category);
    }
    getCategories();
  }, []);

  return (
    <div>
      {/* <!-- DÉBUT BOUTIQUE --> */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            {/* <!-- Boutique Aside --> */}
            <div className="shop-aside">
              <div className="box-field box-field__search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Rechercher"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="icon-search"></i>
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Catégories</span>

                <ul>
                  {categories.map((category) => {
                    return (
                      <li
                        onClick={() => {
                          setTitle(category._id);
                          setSelectedCategory(category._id);
                          setPage(1);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <a>
                          {category._id} <span>({category.count})</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
           
            </div>
            {/* <!-- Boutique Principale --> */}
            <div className="shop-main">
              <div className="shop-main__filter">
                <div className="shop-main__checkboxes">
                  <label className="checkbox-box">
                    <input
                      checked={filter.isSale}
                      onChange={() =>
                        setFilter({ ...filter, isSale: !filter.isSale })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    PROMO
                  </label>
                  <label className="checkbox-box">
                    <input
                      checked={filter.isNew}
                      onChange={() =>
                        setFilter({ ...filter, isNew: !filter.isNew })
                      }
                      type="checkbox"
                    />
                    <span className="checkmark"></span>
                    NOUVEAU
                  </label>
                </div>
                <div className="shop-main__select">
                  <Dropdown
                    options={options}
                    className="react-dropdown"
                    value={options[0]}
                    onChange={(e) => {
                      setSortByPrice(e.value);
                    }}
                  />
                </div>
              </div>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div class="spinner"></div>
                </div>
              ) : productData.length ? (
                <>
                  <div className="shop-main__items">
                    <Products products={productData} />
                  </div>

                  <PagingList
                    previewsPage={previewsPage}
                    nextPage={nextPage}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                  />
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h5 style={{ marginTop: "50px" }}>Aucun produit trouvé</h5>
                </div>
              )}
            </div>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
        <img
          className="shop-decor js-img"
          src="/assets/img/shop-decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- BOUTIQUE FIN --> */}
    </div>
  );
};
