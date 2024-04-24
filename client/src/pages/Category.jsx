import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Category.js";
import { categoryData } from "../assets/data/categoryData.js";
import { ProductBlog, ProductList, SlideProduct } from "../components";
import customFetch from "../utils/customFetch";
import { Form, NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { FaEye } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { Skeleton, Grid, Box } from "@mui/material";

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

    const productData = await customFetch
      .get(`/product?category=${id}&page=1&limit=10&status=Available`)
      .then(({ data }) => data);

    const productsMostView = await customFetch
      .get(`/product?category=${id}&sort=-viewed&limit=10&status=Available`)
      .then(({ data }) => data);

    const { categoryBlog } = await customFetch
      .get(`/category/${id}`)
      .then(({ data }) => data);

    return {
      productData,
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
  const { productFilter, id, productsMostView, categoryBlog, searchParams } =
    useLoaderData();

  const { sort, ram, ["ổ cứng"]: rom, cpu } = searchParams;

  const [products, setProducts] = useState(productFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isShow, setIsShow] = useState(true);

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
        <div className="block-filter-sort">
          <Form>
            <div className="block-filter-sort-title">Chọn theo tiêu chí</div>
            <div className="filter-sort-list-filter">
              <select name="sort" defaultValue={sort}>
                <option value="">Sort</option>
                <option value="-salePrice">Giá Cao - Thấp</option>
                <option value="salePrice">Giá Thấp - Cao</option>
                <option value="-viewed">Xem nhiều</option>
              </select>

              <select name="ram" defaultValue={ram}>
                <option value="">RAM</option>
                <option value="4gb">4GB</option>
                <option value="8gb">8GB</option>
                <option value="12gb">12GB</option>
                <option value="16gb">16GB</option>
                <option value="18gb">18GB</option>
                <option value="24gb">24GB</option>
                <option value="32gb">32GB</option>
                <option value="36gb">36GB</option>
                <option value="64gb">64GB</option>
              </select>

              <select name="ổ cứng" defaultValue={rom}>
                <option value="">Ổ cứng</option>
                <option value="256gb">256GB</option>
                <option value="512gb">512GB</option>
              </select>

              <select name="cpu" defaultValue={cpu}>
                <option value="">CPU</option>
                <option value="intel core i9">Intel Core i9</option>
                <option value="intel core i7">Intel Core i7</option>
                <option value="intel core i5">Intel Core i5</option>
                <option value="amd ryzen 7">AMD Ryzen 7</option>
                <option value="amd ryzen 5">AMD Ryzen 5</option>
                <option value="amd ryzen 3">AMD Ryzen 3</option>
                <option value="apple m1">Apple M1</option>
                <option value="apple m2">Apple M2</option>
                <option value="apple m3">Apple M3</option>
                <option value="apple m1 pro">Apple M1 Pro</option>
                <option value="apple m2 pro">Apple M2 Pro</option>
                <option value="apple m3 pro">Apple M3 Pro</option>
              </select>

              <button type="submit" className="btn">
                Apply
              </button>
            </div>
          </Form>

          <button className="btn" onClick={() => navigate(`/category/${id}`)}>
            Reset
          </button>

          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="rectangular" width={200} height={380} />
              <Skeleton variant="rectangular" width={200} height={380} />
              <Skeleton variant="rectangular" width={200} height={380} />
              <Skeleton variant="rectangular" width={200} height={380} />
              <Skeleton variant="rectangular" width={200} height={380} />
            </div>
          ) : (
            <ProductList products={products} />
          )}
        </div>

        {isShow && (
          <div className="btn-load" onClick={() => loadMore()}>
            {isLoading ? "Loading" : "Xem thêm"}
          </div>
        )}

        {/* BOT */}
        <div className="bot-container">
          <div className="bot-container-column-1">
            <ProductBlog productBlog={categoryBlog} />
          </div>
          <div className="bot-container-column-2"></div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Category;
