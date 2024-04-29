import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import Wrapper from "../assets/wrappers/Product.js";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SlideGallery from "../components/SlideGallery";
import customFetch from "../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import {
  ProductBlog,
  ProductReview,
  ProductAttribute,
  SlideProduct,
} from "../components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // await customFetch.patch("/product/rating", data);
    toast.success("Gửi đánh giá thành công", { autoClose: 1000 });
    return null;
  } catch (error) {
    if (error?.response?.status === 401)
      return toast.success("Please login to rating", { autoClose: 1000 });
    return toast.error(error?.response?.data?.msg);
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    let { product, attribute, variation, productBlog } = await customFetch
      .get(`/product/${id}`)
      .then(({ data }) => data);

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

    const productReviews = await customFetch
      .get(`/review/get-reviews/${id}`)
      .then(({ data }) => data);

    const relateModel = await customFetch
      .get(`/product/get-relate/${product.model}`)
      .then(({ data }) => data);

    let relatedProducts = await customFetch
      .get(`/product/?category=${product.category[0]}&limit=10`)
      .then(({ data }) => data);

    relatedProducts = relatedProducts.filter((i) => i._id !== id);

    window.scrollTo(0, 0);
    return {
      product,
      relateModel,
      attribute,
      variation,
      productBlog,
      productReviews,
      relatedProducts,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Product = () => {
  const navigate = useNavigate();

  const {
    product,
    relateModel,
    attribute,
    variation,
    productBlog,
    productReviews,
    relatedProducts,
  } = useLoaderData();

  const addToCart = debounce(async (product, variant) => {
    // if (Object.keys(variant).length !== 0) variant = Object.values(variant);
    const cart = await customFetch
      .patch("/cart/add-to-cart", {
        product,
        variant,
      })
      .then(({ data }) => data);
    cart && toast.success("Add to cart successful");
  }, 100);

  // Khởi tạo state để lưu trữ giá trị đầu tiên cho mỗi loại biến thể
  const [selectedVariants, setselectedVariants] = useState(() => {
    const initialValues = {};
    if (Object.keys(variation).length > 0) {
      Object.entries(variation).forEach(([key, items]) => {
        initialValues[key] = items[0]._id;
      });
    } else {
      return null;
    }
    return initialValues;
  });

  // Hàm để cập nhật giá trị được chọn cho mỗi loại biến thể
  const handleChange = (key, value) => {
    setselectedVariants({
      ...selectedVariants,
      [key]: value,
    });
  };

  const [reviews, setReviews] = useState(productReviews);
  const submitReview = async (star, content) => {
    try {
      await customFetch.post("/review/create-review", {
        rating: star,
        productId: product._id,
        content: content,
      });
      const fetchReview = await customFetch
        .get(`/review/get-reviews/${product._id}`)
        .then(({ data }) => data);
      setReviews(fetchReview);
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
  };

  const replyReview = async (content, reviewId) => {
    try {
      await customFetch.patch(`/review/reply-review/${reviewId}`, {
        content,
      });
      const fetchReview = await customFetch
        .get(`/review/get-reviews/${product._id}`)
        .then(({ data }) => data);
      setReviews(fetchReview);
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
  };

  const deleteReplyReview = async (reviewId, replyId) => {
    try {
      await customFetch.delete(`/review/reply-review/${reviewId}`, {
        replyId,
      });
      const fetchReview = await customFetch
        .get(`/review/get-reviews/${product._id}`)
        .then(({ data }) => data);
      setReviews(fetchReview);
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
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
              {/* VARIANT */}
              <div style={{ display: "flex", gap: 20 }}>
                {relateModel?.length > 1 &&
                  relateModel?.map((item) => {
                    return (
                      <div
                        className={
                          item._id === product._id ? "model active" : "model"
                        }
                        key={item._id}
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {item._id === product._id && (
                          <span className="active-icon">✓</span>
                        )}
                        <div className="model-info">
                          {item.attribute.map((i) => {
                            if (i.mainAttribute)
                              return (
                                <span style={{ fontWeight: "700" }} key={i._id}>
                                  {i.attributeValue}
                                </span>
                              );
                          })}
                        </div>
                        <span>
                          {item.salePrice
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          đ
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="box-product-price">
                <span>
                  {product?.salePrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  <span style={{ fontSize: 16 }}>₫</span>
                </span>

                <span className="strike">
                  {product?.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  <span style={{ fontSize: 13 }}>₫</span>
                </span>
              </div>

              <div className="btn-buy">
                <button
                  className="btn-buynow"
                  onClick={() => [
                    addToCart(product, selectedVariants),
                    navigate("/cart"),
                  ]}
                >
                  Mua ngay
                </button>

                <button
                  className="btn-addtocart"
                  onClick={() => addToCart(product, selectedVariants)}
                >
                  <AddShoppingCartIcon />
                  <p>Thêm vào giỏ</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* MID */}
        <div className="mid-container">
          <span className="mid-title">SẢN PHẨM TƯƠNG TỰ</span>
          {relatedProducts.length > 0 && (
            <SlideProduct products={relatedProducts} />
          )}
        </div>

        {/* BOT */}
        <div className="bot-container">
          <div className="bot-container-column-1">
            <ProductBlog productBlog={productBlog} />
            <ProductReview
              product={product}
              reviews={reviews}
              submitReview={submitReview}
              replyReview={replyReview}
              deleteReplyReview={deleteReplyReview}
            />
          </div>
          <div className="bot-container-column-2">
            <ProductAttribute attribute={attribute} />
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Product;
