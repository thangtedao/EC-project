import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import styled from "styled-components";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SlideGallery from "../components/SlideGallery";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import {
  ProductBlog,
  ProductReview,
  ProductSpecifications,
  SlideProduct,
} from "../components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/LogoNova.svg";
import { Radio } from "antd";

const Wrapper = styled.div`
  width: 1100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;

  .top-product-title {
    width: 100%;
    font-size: 1.3rem;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }

  /* TOP */
  .top-container {
    width: 100%;
    display: flex;
    gap: 1.5rem;
  }
  .top-container-column-1 {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .top-container-column-2 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 40%;
  }
  .sliding-product-image {
    width: 100%;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    margin-right: 1rem;
    border-radius: 10px;
    overflow: hidden;
  }
  .product-img {
    height: 350px;
  }

  .box-product-variants {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .box-product-price {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: 1.3rem;
    font-weight: bold;
    color: #e04040;
    .strike {
      font-size: 1rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .btn-buy {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .btn-buynow {
    width: 90%;
    border-radius: 10px;
    border: none;
    background: linear-gradient(#f52f32, #e11b1e);
    font-weight: 700;
    font-size: 1.3rem;
    color: white;
    text-transform: uppercase;
    cursor: pointer;
  }
  .btn-addtocart {
    border-color: #e04040;
    color: #e04040;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0.2rem;
    cursor: pointer;
    p {
      font-size: 0.6rem;
    }
  }

  /* MID */
  .mid-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 2rem;
    margin-top: 1rem;
    border-top: 1px solid lightgray;
    .mid-title {
      font-size: 1.3rem;
      font-weight: bold;
      color: #4a4a4a;
    }
  }

  /* BOT */
  .bot-container {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 1rem;
    border-top: 1px solid lightgray;
    padding-top: 2rem;
    margin-top: 1rem;
  }
  .bot-container-column-1 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .bot-container-column-2 {
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 950px) {
    /* TOP */
    .top-container-column-1 {
      width: 40%;
    }
    .top-container-column-2 {
      width: 60%;
    }
  }
  @media (max-width: 750px) {
    /* TOP */
    .top-container {
      flex-direction: column;
      gap: 1rem;
    }
    .top-container-column-1 {
      width: 100%;
    }
    .top-container-column-2 {
      width: 100%;
    }

    /* BOT */
    .bot-container {
      grid-template-columns: 1fr;
    }
    .bot-container-column-2 {
      display: none;
    }
  }

  #blog {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
    background-color: #fff;
    text-align: left;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  .blog-content {
    position: relative;
    height: 500px;
    overflow: hidden;
  }
  .blog-content p {
    text-align: justify;
    font-size: 15px;
    line-height: 1.5;

    font-weight: 500;
    color: #444;
    margin-bottom: 10px;
  }
  .blog-content h2 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0.3rem;
  }
  .blog-content h3 {
    font-size: 1.05rem;
    font-weight: 700;
    margin: 1rem 0 0.5rem 0;
  }
  .blog-content img {
    width: 100%;
  }
  .blog-showmore {
    padding-top: 50px;
    text-align: center;

    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    cursor: pointer;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.91) 50%,
      #fff 55%
    );

    :hover {
      color: #e04040;
    }
  }
`;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    // await customFetch.patch("/product/rating", data);
    toast.success("Gửi đánh giá thành công", { autoClose: 1000 });
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg, {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    let { product, variation, productBlog } = await customFetch
      .get(`/product/${id}`)
      .then(({ data }) => data);

    // const relatedProducts = await customFetch
    //   .get(`/product/category/?category=${product.category[1]}&limit=10`)
    //   .then(({ data }) => data.products);

    if (variation) {
      variation = variation.reduce((groups, item) => {
        const { variationName } = item;
        if (!groups[variationName]) {
          groups[variationName] = [];
        }
        groups[variationName].push(item);
        return groups;
      }, {});
    }

    window.scrollTo(0, 0);
    return { product, variation, productBlog };
  } catch (error) {
    return error;
  }
};

const Product = () => {
  const navigate = useNavigate();

  const { product, variation, productBlog } = useLoaderData();
  const user = useSelector((state) => state.user.user);

  const addToCart = debounce(async (product, variant, user) => {
    if (Object.keys(variant).length !== 0) variant = Object.values(variant);
    else variant = [];
    const cart = await customFetch
      .patch("/cart/add-to-cart", {
        product,
        variant,
      })
      .then(({ data }) => data);
    cart &&
      toast.success("Add to cart successful", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
  }, 100);

  // Khởi tạo state để lưu trữ giá trị đầu tiên cho mỗi loại biến thể
  const [selectedVariants, setselectedVariants] = useState(() => {
    const initialValues = {};
    Object.entries(variation).forEach(([key, items]) => {
      initialValues[key] = items[0]._id;
    });
    return initialValues;
  });

  // Hàm để cập nhật giá trị được chọn cho mỗi loại biến thể
  const handleChange = (key, value) => {
    setselectedVariants({
      ...selectedVariants,
      [key]: value,
    });
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Product</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        {/* TOP */}
        <div className="top-product-title">{product?.name}</div>

        <div className="top-container">
          <div className="top-container-column-1">
            <div className="sliding-product-image">
              <SlideGallery image={product?.images} />
            </div>
          </div>

          {product.status !== PRODUCT_STATUS.AVAILABLE ? (
            <div className="top-container-column-2">
              {product.status === PRODUCT_STATUS.OUT_OF_STOCK ? (
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  SẢN PHẨM TẠM HẾT HÀNG
                </div>
              ) : (
                <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  SẢN PHẨM NGỪNG KINH DOANH
                </div>
              )}
            </div>
          ) : (
            <div className="top-container-column-2">
              <div className="box-product-variants">
                {product?.types?.map((type) => {
                  return <ProductType text={type} />;
                })}
              </div>

              {/* Chọn variant */}
              <div className="box-product-variants">
                {Object.entries(variation)?.map(([key, items]) => (
                  <div key={key}>
                    <p>{key}</p>
                    <Radio.Group
                      value={selectedVariants[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    >
                      {items.map((item) => (
                        <Radio.Button value={item._id} key={item._id}>
                          {item.variationValue}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </div>
                ))}
              </div>

              <div className="box-product-price">
                <p>
                  {product?.salePrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                </p>
                <p className="strike">
                  {product?.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                </p>
              </div>
              <div className="btn-buy">
                <button
                  className="btn-buynow"
                  onClick={() => [
                    addToCart(product, variant, user),
                    navigate("/cart"),
                  ]}
                >
                  Mua ngay
                </button>
                <button
                  className="btn-addtocart"
                  onClick={() => addToCart(product, selectedVariants, user)}
                >
                  <AddShoppingCartIcon />
                  <p>Thêm vào giỏ</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MID */}
        {/* <div className="mid-container">
          <span className="mid-title">SẢN PHẨM TƯƠNG TỰ</span>
          {relatedProducts.length > 0 && (
            <SlideProduct products={relatedProducts} />
          )}
        </div> */}

        {/* BOT */}
        <div className="bot-container">
          <div className="bot-container-column-1">
            <ProductBlog productBlog={productBlog} />
            {/* <ProductReview product={product} /> */}
          </div>
          <div className="bot-container-column-2">
            <ProductSpecifications product={product} />
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Product;
