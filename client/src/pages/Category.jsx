import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Category.js";
import { categoryData } from "../assets/data/categoryData.js";
import {
  FilterLaptop,
  FilterPhone,
  ProductBlog,
  ProductList,
  SlideProduct,
} from "../components";
import customFetch from "../utils/customFetch";
import { Form, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import Slider from "@mui/material/Slider";

export const loader = async ({ params, request }) => {
  try {
    const { id } = params;
    params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    params.category = id;
    const productFilter = await customFetch
      .get("/product/filter", { params })
      .then(({ data }) => data);

    const productsMostView = await customFetch
      .get(`/product?category=${id}&sort=-viewed&limit=10&status=Available`)
      .then(({ data }) => data);

    const { category, categoryBlog } = await customFetch
      .get(`/category/${id}`)
      .then(({ data }) => data);

    return {
      category,
      productFilter,
      id,
      productsMostView,
      categoryBlog,
      searchParams: { ...params },
    };
  } catch (error) {
    return error;
  }
};

const Category = () => {
  const navigate = useNavigate();
  const {
    category,
    productFilter,
    id,
    productsMostView,
    categoryBlog,
    searchParams,
  } = useLoaderData();

  let { sort, minPrice, maxPrice } = searchParams;
  if (minPrice && maxPrice) {
    minPrice = parseInt(minPrice);
    maxPrice = parseInt(maxPrice);
  } else {
    minPrice = 0;
    maxPrice = 500000;
  }

  const [mainCategory, setMainCategory] = useState(category);

  useEffect(() => {
    const fetch = async () => {
      const cat = await customFetch
        .get(`/category/${category.parent}`)
        .then(({ data }) => data.category);
      setMainCategory(cat);
    };
    if (category.parent) fetch();
  }, []);

  let ram, rom, cpu, chip;

  if (mainCategory.slug === "laptop") {
    ({ ram, ["ổ cứng"]: rom, cpu } = searchParams);
  } else if (mainCategory.slug === "phone") {
    ({ ram, rom, chip } = searchParams);
  }

  const [products, setProducts] = useState(productFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isShow, setIsShow] = useState(true);
  const [MinPrice, setMinPrice] = useState(0);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Category</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="block-top-filter-brands">
          {categoryData.map((item, index) => {
            return (
              <div key={index} className="brands-list">
                <NavLink>
                  <img src={item.image} />
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* --------- HOT SALE -------- */}
        <div className="block-hot-sale">
          <div className="block-title">
            <div className="sale-title">SẢN PHẨM NỔI BẬT NHẤT</div>
            {/* <div className="box-countdown">00:11:22:33</div> */}
          </div>
          {productsMostView?.length > 0 && (
            <SlideProduct products={productsMostView} />
          )}
        </div>

        {/* --------- ALL PRODUCTS -------- */}
        {/* <div className="block-filter-sort">
          <Form className="filter-form">
            <div className="block-filter-sort-title">Chọn theo tiêu chí</div>

            {(() => {
              switch (mainCategory.slug) {
                case "laptop":
                  return <FilterLaptop ram={ram} rom={ram} cpu={cpu} />;
                case "phone":
                  return <FilterPhone ram={ram} rom={ram} chip={chip} />;
                default:
                  return null;
              }
            })()}

            <div className="slider">
              <div>Price</div>
              <Slider
                name="maxPrice"
                defaultValue={[minPrice, maxPrice]}
                max={500000}
                step={10000}
                valueLabelDisplay="auto"
                onChange={(_, newValue) => [setMinPrice(newValue[0])]}
              />
            </div>

            <select name="sort" defaultValue={sort}>
              <option value="">Sắp xếp theo</option>
              <option value="-salePrice">Giá Cao - Thấp</option>
              <option value="salePrice">Giá Thấp - Cao</option>
              <option value="-viewed">Xem nhiều</option>
            </select>

            <input name="minPrice" readOnly value={MinPrice} hidden />

            <div>
              <button type="submit" className="btn">
                Apply
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => navigate(`/category/${id}`)}
              >
                Reset
              </button>
            </div>
          </Form>

          <ProductList products={products} />
        </div> */}

        {/* BOT */}
        <div className="bot-container">
          <div className="bot-container-column-1">
            {categoryBlog && <ProductBlog productBlog={categoryBlog} />}
          </div>
          <div className="bot-container-column-2"></div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Category;
