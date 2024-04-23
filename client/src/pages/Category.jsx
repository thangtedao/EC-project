import React, { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Category.js";
import { categoryData } from "../assets/data/categoryData.js";
import { ProductBlog, ProductList, SlideProduct } from "../components";
import customFetch from "../utils/customFetch";
import { Form, NavLink, useLoaderData } from "react-router-dom";
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
    console.log(params);
    params.category = id;
    const products = await customFetch
      .get("/product/filter", { params })
      .then(({ data }) => data);
    console.log(products);

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
  const { productData, id, productsMostView, categoryBlog, searchParams } =
    useLoaderData();

  const { sort, ram, ["ổ cứng"]: oCung } = searchParams;

  const [products, setProducts] = useState(productData);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [isShow, setIsShow] = useState(true);

  let firstUrl = `/product/?category=${id}&page=${page}&limit=10&status=Available`;

  const [url, setUrl] = useState(firstUrl);
  const [filterType, setFilterType] = useState();

  const loadMore = debounce(async () => {
    try {
      setIsLoading(true);
      const fetchData = await customFetch.get(url).then(({ data }) => data);
      setProducts([...products, ...fetchData]);
    } catch (error) {
      if (error?.response?.status === 404) setIsShow(false);
      else console.log(error);
    } finally {
      setIsLoading(false);
      setPage(page + 1);
      console.log(page);
    }
  }, 200);

  const filterLowToHigh = debounce(async () => {
    try {
      setIsLoading(true);
      setFilterType("lth");
      setUrl(
        `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=salePrice`
      );

      let endpoint = `/product/?category=${id}&page=1&limit=10&status=Available&sort=salePrice`;
      const fetchData = await customFetch
        .get(endpoint)
        .then(({ data }) => data);
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsShow(true);
      setPage(2);
    }
  }, 300);

  const filterHighToLow = debounce(async () => {
    try {
      setIsLoading(true);
      setFilterType("htl");
      setUrl(
        `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=-salePrice`
      );

      let endpoint = `/product/?category=${id}&page=1&limit=10&status=Available&sort=-salePrice`;
      const fetchData = await customFetch
        .get(endpoint)
        .then(({ data }) => data);
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsShow(true);
      setPage(2);
    }
  }, 300);

  const filterMostViewed = debounce(async () => {
    try {
      setIsLoading(true);
      setFilterType("mv");
      setUrl(
        `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=-viewed`
      );

      let endpoint = `/product/?category=${id}&page=1&limit=10&status=Available&sort=-viewed`;
      const fetchData = await customFetch
        .get(endpoint)
        .then(({ data }) => data);
      setProducts(fetchData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsShow(true);
      setPage(2);
    }
  }, 300);

  useEffect(() => {
    switch (filterType) {
      case "htl":
        setUrl(
          `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=-salePrice`
        );
        break;

      case "lth":
        setUrl(
          `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=salePrice`
        );
        break;

      case "mv":
        setUrl(
          `/product/?category=${id}&page=${page}&limit=10&status=Available&sort=-viewed`
        );
        break;

      default:
        setUrl(
          `/product/?category=${id}&page=${page}&limit=10&status=Available`
        );
        break;
    }
  }, [page]);

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
              <div className="btn-filter">Beta</div>
              <select name="sort" defaultValue={sort}>
                <option value="-salePrice">Giá Cao - Thấp</option>
                <option value="salePrice">Giá Thấp - Cao</option>
                <option value="-viewed">Xem nhiều</option>
              </select>

              <select name="ram" defaultValue={ram}>
                <option value="8gb">8GB</option>
                <option value="16gb">16GB</option>
              </select>

              <select name="ổ cứng" defaultValue={oCung}>
                <option value="256gb">256GB</option>
                <option value="512gb">512GB</option>
              </select>

              <button type="submit" className="btn">
                Apply
              </button>
            </div>

            <div className="block-filter-sort-title">Sắp xếp theo</div>
            <div className="filter-sort-list-filter">
              <div className="btn-filter" onClick={() => filterHighToLow()}>
                <FaSortAmountDown />
                Giá Cao - Thấp
              </div>
              <div className="btn-filter" onClick={() => filterLowToHigh()}>
                <FaSortAmountUp />
                Giá Thấp - Cao
              </div>
              <div className="btn-filter" onClick={() => filterMostViewed()}>
                <FaEye />
                <span>Xem nhiều</span>
              </div>
            </div>
          </Form>

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
