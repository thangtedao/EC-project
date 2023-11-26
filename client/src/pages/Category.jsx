import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { categoryData } from "../assets/data/categoryData";
import { FAQ, ProductList, SlideProduct } from "../components";
import customFetch from "../utils/customFetch";
import { NavLink, useLoaderData } from "react-router-dom";
import { debounce } from "lodash";
import { FaEye } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { FaSortAmountUp } from "react-icons/fa";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;

  .block-top-filter-brands {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .brands-list {
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 3px 0;
    img {
      height: 25px;
    }
  }
  .nav-link {
    width: 110px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: 1px solid lightgray;
    img {
      width: 100%;
      height: auto;
    }
  }

  /* HOT SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    background-color: #580f0f;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
  }
  .block-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  .sale-title {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }
  .box-countdown {
  }

  /* ALL PRODUCT */
  .block-filter-sort {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .block-filter-sort-title {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .filter-sort-list-filter {
    display: flex;
    gap: 1rem;
  }
  .btn-filter {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    padding: 0 0.5rem;
    background-color: #ebebeb;
    cursor: pointer;
  }
  .btn-load {
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 8px;
    padding: 0 4rem;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    background-color: #fff;
    cursor: pointer;
    :hover {
      background-color: rgba(217, 83, 79, 0.1);
      color: #d70018;
    }
  }

  /* BOT */
  .bot-container {
    width: 100%;
    display: flex;
    gap: 1rem;
    border-top: 1px solid lightgray;
    padding: 1rem 0;
  }
  .bot-container-column-1 {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bot-container-column-2 {
    flex: 1;
  }
  .product-description {
    border: 0.5px solid lightgrey;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1rem;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 750px) {
    /* BOT */
    .bot-container-column-1 {
      flex: none;
      width: 100%;
    }
    .bot-container-column-2 {
      display: none;
    }
  }
`;

export const loader = async ({ params }) => {
  try {
    const { slug1, slug2 } = params;

    let endpoint = `/product/category?category=${slug1}&page=1&limit=10`;

    const response = await customFetch.get(endpoint);

    const productsMostView = await customFetch
      .get(`/product/category?category=${slug1}&sort=-viewed&limit=10`)
      .then(({ data }) => data.products);

    window.scrollTo(0, 0);
    return { response, slug1, productsMostView };
  } catch (error) {
    return error;
  }
};

const Category = () => {
  const { response, slug1, productsMostView } = useLoaderData();
  const [products, setProducts] = useState(response.data.products);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [url, setUrl] = useState(
    `/product/category?category=${slug1}&page=${page}&limit=10`
  );
  const [lth, setLth] = useState(false);
  const [htl, setHtl] = useState(false);
  const [mv, setMv] = useState(false);

  const loadMore = debounce(async () => {
    try {
      setIsLoading(true);
      const response = await customFetch.get(url);
      setProducts([...products, ...response.data.products]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPage(page + 1);
    }
  }, 200);

  const filterLowToHigh = debounce(async () => {
    try {
      setIsLoading(true);
      setLth(true);
      setMv(false);
      setHtl(false);
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=salePrice`
      );

      let endpoint = `/product/category?category=${slug1}&page=1&limit=10&sort=salePrice`;
      const response = await customFetch.get(endpoint);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPage(2);
    }
  }, 300);

  const filterHighToLow = debounce(async () => {
    try {
      setIsLoading(true);
      setLth(false);
      setMv(false);
      setHtl(true);
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=-salePrice`
      );

      let endpoint = `/product/category?category=${slug1}&page=1&limit=10&sort=-salePrice`;
      const response = await customFetch.get(endpoint);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPage(2);
    }
  }, 300);

  const filterMostViewed = debounce(async () => {
    try {
      setIsLoading(true);
      setLth(false);
      setMv(true);
      setHtl(false);
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=-viewed`
      );

      let endpoint = `/product/category?category=${slug1}&page=1&limit=10&sort=-viewed`;
      const response = await customFetch.get(endpoint);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setPage(2);
    }
  }, 300);

  useEffect(() => {
    if (htl)
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=-salePrice`
      );
    else if (lth)
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=salePrice`
      );
    else if (mv)
      setUrl(
        `/product/category?category=${slug1}&page=${page}&limit=10&sort=-viewed`
      );
    else setUrl(`/product/category?category=${slug1}&page=${page}&limit=10`);
  }, [page]);

  return (
    <Wrapper>
      <div className="block-top-filter-brands">
        {categoryData.map((item, index) => {
          return (
            <div className="brands-list">
              <NavLink key={index}>
                <img src={item.image} />
              </NavLink>
            </div>
          );
        })}
      </div>

      {/* --------- HOT SALE -------- */}
      <div className="block-hot-sale">
        <div className="block-title">
          <div className="sale-title">TOP 10 NỔI BẬT NHẤT</div>
          {/* <div className="box-countdown">00:11:22:33</div> */}
        </div>
        {productsMostView?.length > 0 && (
          <SlideProduct products={productsMostView} />
        )}
      </div>

      {/* --------- ALL PRODUCTS -------- */}
      <div className="block-filter-sort">
        <div className="block-filter-sort-title">Chọn theo tiêu chí</div>
        <div className="filter-sort-list-filter">
          <div className="btn-filter">Beta</div>
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
        <ProductList products={products} />
      </div>
      <div className="btn-load" onClick={() => loadMore()}>
        {isLoading ? "Loading" : "Xem thêm"}
      </div>

      {/* BOT */}
      <div className="bot-container">
        <div className="bot-container-column-1">
          <div className="product-description">
            <p>
              Trong tháng 6 này, mẫu điện thoại gaming Nubia Neo đã chính thức
              xuất hiện với giá bán cực tốt. Với mức giá chỉ ngang một sản phẩm
              tầm trung giá rẻ, điện thoại Nubia Neo được trang bị những gì để
              đáp ứng tốt nhất nhu cầu chơi game của người dùng? Cùng CellphoneS
              đánh giá kỹ hơn về mẫu điện thoại gaming này trong bài viết đây.
            </p>
          </div>
          <FAQ />
        </div>
        <div className="bot-container-column-2"></div>
      </div>
    </Wrapper>
  );
};

export default Category;
