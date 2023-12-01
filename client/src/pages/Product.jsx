import React from "react";
import styled from "styled-components";
import ProductType from "../components/productDetail/ProductType";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  ProductReview,
  ProductSpecifications,
  SlideProduct,
} from "../components";
import SlideGallery from "../components/SlideGallery";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/cartSlice";
import { toast } from "react-toastify";
import { debounce } from "lodash";

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
  .other-product-img {
    display: flex;
    gap: 1rem;
    div {
      border: 0.5px solid green;
      width: 50px;
      height: 50px;
    }
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
    color: #fd2424;
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
    .bot-container-column-2 {
      display: none;
    }
  }
`;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch("/product/rating", data);
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
    const { slug } = params;
    const product = await customFetch
      .get(
        `/product/${slug}?fields=_id,name,price,salePrice,category,images,review,ratings,totalRating&populate=ratings.postedby`
      )
      .then(({ data }) => data.product);

    const relatedProducts = await customFetch
      .get(`/product/category/?category=${product.category}&limit=10`)
      .then(({ data }) => data.products);
    window.scrollTo(0, 0);
    return { product, relatedProducts };
  } catch (error) {
    return error;
  }
};

const Product = () => {
  const dispatch = useDispatch();

  const { product, relatedProducts } = useLoaderData();
  const user = useSelector((state) => state.user.user);

  const debouncedAddToCartBtn = debounce((product, user) => {
    dispatch(addToCart({ product: { ...product, count: 1 }, user }));
    toast.success("Thêm vào giỏ thành công", {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  }, 100);

  return (
    <Wrapper>
      {/* TOP */}
      <div className="top-product-title">{product?.name}</div>

      <div className="top-container">
        <div className="top-container-column-1">
          <div className="sliding-product-image">
            <SlideGallery image={product?.images} />
          </div>
          <div className="other-product-img">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className="top-container-column-2">
          <div className="box-product-variants">
            {product?.types?.map((type) => {
              return <ProductType text={type} />;
            })}
          </div>

          <p>Chọn màu</p>
          <div className="box-product-variants">
            {product?.colors?.map((color) => {
              return <ProductType text={color} />;
            })}
          </div>

          <div className="box-product-price">
            <p>{product?.salePrice + "₫"}</p>
            <p className="strike">{product?.price + "₫"}</p>
          </div>

          <div className="btn-buy">
            <button className="btn-buynow">Mua ngay</button>
            <button
              className="btn-addtocart"
              onClick={() => [
                debouncedAddToCartBtn({ ...product, count: 1 }, user),
              ]}
            >
              <AddShoppingCartIcon />
              <p>Thêm vào giỏ</p>
            </button>
          </div>
        </div>
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
          <div className="product-description">
            <p>
              Trong tháng 6 này, mẫu điện thoại gaming Nubia Neo đã chính thức
              xuất hiện với giá bán cực tốt. Với mức giá chỉ ngang một sản phẩm
              tầm trung giá rẻ, điện thoại Nubia Neo được trang bị những gì để
              đáp ứng tốt nhất nhu cầu chơi game của người dùng? Cùng CellphoneS
              đánh giá kỹ hơn về mẫu điện thoại gaming này trong bài viết đây.
            </p>
          </div>
          <ProductReview product={product} />
        </div>
        <div className="bot-container-column-2">
          <ProductSpecifications />
        </div>
      </div>
    </Wrapper>
  );
};

export default Product;
