import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
// import productData from "data/product/product";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { AsideItem } from "../shared/AsideItem/AsideItem";
import axios from "axios";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: "highToMin", label: "From expensive to cheap" },
  { value: "minToHigh", label: "From cheap to expensive" },
];
export const Shop = () => {
  const [productData, setProductData] = useState([]);
  const allProducts = [...productData];
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productOrder, setProductOrder] = useState(
    allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
  );
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([...productOrder]);
  const [filter, setFilter] = useState({ isNew: false, isSale: true });

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/api/product/get-category"
      );
      setCategories(res.data.categoryCounts);
    } catch (error) {}
  };

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/product/all", {
        params: {
          page: page, // Send current page as a query parameter
          limit: 6, // Send limit as a query parameter
          categorie: selectedCategory,
        },
      });
      console.log(res.data.products);
      
      setProductData(res.data.products);
      setTotalPages(res.data.totalPages); // Update totalPages from the response
     // Update the page state
    } catch (error) {
      console.error(error);
    }
  };

  const previewsPage = async () => {
    if (page > 1) {
       setPage(page - 1);
    }
  };

  const nextPage = async () => {
    if (page < totalPages) {
       setPage(page + 1);
    }
  };


  useEffect(() => {
    getProducts();
  },[page,selectedCategory]);

  useEffect(() => {
    getCategories();
  },[])

  useEffect(() => {
    setProducts(productOrder);
  }, [productOrder]);


  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            {/* <!-- Shop Aside --> */}
            <div className="shop-aside">
              <div className="box-field box-field__search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                />
                <i className="icon-search"></i>
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Categories</span>

                <ul>
                  {categories.map((category) => {
                    return (
                      <li onClick={()=>{setSelectedCategory(category._id)}} style={{cursor:"pointer"}}>
                        <a >
                          {category._id} <span>({category.count})</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Price</span>
                <div className="range-slider">
                  <Range
                    min={0}
                    max={20}
                    defaultValue={[0, 20]}
                    tipFormatter={(value) => `${value}$`}
                    allowCross={false}
                    tipProps={{
                      placement: "bottom",
                      prefixCls: "rc-slider-tooltip",
                    }}
                  />
                </div>
              </div>
              
            </div>
            {/* <!-- Shop Main --> */}
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
                    SALE
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
                    NEW
                  </label>
                </div>
                <div className="shop-main__select">
                  <Dropdown
                    options={options}
                    className="react-dropdown"
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  />
                </div>
              </div>
              <div className="shop-main__items">
                <Products products={productData} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList
                previewsPage={previewsPage}
                nextPage={nextPage}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
              />
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
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};