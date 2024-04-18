import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import Wrapper from "../assets/wrappers/Product.js";
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
import NovaIcon from "../assets/logo/LogoNova.svg";
import { Radio } from "antd";

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
                    <p style={{ margin: "10px 0" }}>{key}</p>
                    <Radio.Group
                      value={selectedVariants[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    >
                      {items.map((item) => (
                        <Radio.Button
                          value={item._id}
                          key={item._id}
                          style={{
                            width: 130,
                            height: "auto",
                            fontSize: 14,
                            textAlign: "center",
                            color: "#444444",
                            border:
                              selectedVariants[key] === item._id
                                ? "1.5px solid #e04040"
                                : "1.5px solid lightgray",

                            borderRadius: 0,
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "bold",
                              height: 20,
                            }}
                          >
                            {item.variationValue}
                          </div>
                          <div>{item.priceModifier}đ</div>
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
