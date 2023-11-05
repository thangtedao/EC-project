import React from "react";
import styled from "styled-components";
import NavLinks from "../components/NavLinks";
import { categoryData } from "../assets/data/categoryData";
import { FAQ, ProductList, SlideProduct } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;
  //border: 1px solid green;

  .block-top-filter-brands {
    width: 100%;
  }
  .brands-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
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
    //border: 0.5px solid yellowgreen;
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
    font-size: large;
    font-weight: 500;
  }
  .filter-sort-list-filter {
    display: flex;
    gap: 1rem;
  }
  .btn-filter {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding: 0 0.5rem;
    background-color: #ebebeb;
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
    let products = null;

    if (slug2) {
      products = await customFetch
        .get(`/product/category/?category=${slug1},${slug2}`)
        .then(({ data }) => data.products);
    } else {
      products = await customFetch
        .get(`/product/?category=${slug1}`)
        .then(({ data }) => data.products);
    }

    return { products };
  } catch (error) {
    return error;
  }
};

const Category = () => {
  const { products } = useLoaderData();
  const numOfProduct = products?.length;

  return (
    <Wrapper>
      <div className="block-top-filter-brands">
        <div className="brands-list">
          {categoryData.map((item, index) => {
            return <NavLinks key={index} image={item.image} />;
          })}
        </div>
      </div>

      {/* --------- HOT SALE -------- */}
      <div className="block-hot-sale">
        <div className="block-title">
          <div className="sale-title">HOT SALE</div>
          <div className="box-countdown">00:11:22:33</div>
        </div>
        {numOfProduct > 0 && <SlideProduct products={products} />}
      </div>

      {/* --------- ALL PRODUCTS -------- */}
      <div className="block-filter-sort">
        <div className="block-filter-sort-title">Chọn theo tiêu chí</div>
        <div className="filter-sort-list-filter">
          <div className="btn-filter">Beta</div>
        </div>
        <div className="block-filter-sort-title">Sắp xếp theo</div>
        <div className="filter-sort-list-filter">
          {/* if select, products = filter(products) */}
          <div className="btn-filter">Giá Cao - Thấp</div>
          <div className="btn-filter">Giá Thấp - Cao</div>
          <div className="btn-filter">Xem nhiều</div>
        </div>
        <ProductList products={products} />
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
