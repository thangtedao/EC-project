import styled from "@emotion/styled";
import React, { useState } from "react";
import img from "../../assets/react.svg";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";
import { Form } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;

  // TOP
  .product-review-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 0;
    box-shadow: 0 0 10px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    gap: 1rem;
    padding: 1rem;
    .review-title {
      font-size: 1.1rem;
      font-weight: bold;
      color: #4a4a4a;
    }
  }
  .box-review {
    width: 100%;
    display: flex;
  }
  .box-review-score {
    width: 40%;
    border-right: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    p {
      font-size: 1.35rem;
      font-weight: bold;
      color: #4a4a4a;
    }
  }
  .box-review-star {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  .rating-level {
    display: flex;
    padding: 0.4rem;
    gap: 0.3rem;
    align-items: center;
    .gold {
      color: #ffbf00;
    }
    p {
      font-weight: bold;
    }
  }

  // MID
  .btn-review-container {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    width: 100%;
    display: grid;
    place-items: center;
    padding: 1.3rem;
    gap: 1rem;
  }
  .btn-review {
    padding: 0.6rem 1.5rem;
    display: grid;
    place-items: center;
    background: #d7000e;
    color: white;
    font-size: 1.05rem;
    border-radius: 5px;
    border: 0;
    cursor: pointer;
  }
  .form-rating {
    width: 100%;
    display: grid;
    gap: 1rem;
    p {
      color: #4a4a4a;
      font-size: 1.3rem;
      font-weight: bold;
    }
    textarea {
      width: 90%;
      min-height: 8em;
      max-height: 40em;
      padding: 1rem;
      font-size: 1.1rem;
      resize: vertical;
      border-radius: 10px;
      border: 0;
      box-shadow: 0 0 10px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
    }
    .btn {
      width: 10%;
      height: 35px;
      background: #d7000e;
    }
  }

  // BOT
  .box-review-comment {
    display: grid;
    gap: 2rem;
  }
  .box-review-comment-item {
    display: grid;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .box-review-comment-item-title {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    gap: 1rem;
  }
  .name {
    text-transform: capitalize;
  }
  .box-review-comment-item-content {
    display: grid;
    gap: 1rem;
    padding-left: 3.5rem;
    padding-top: 1rem;
  }
`;

const ProductReview = ({ product }) => {
  const user = useSelector((state) => state.user.user);
  const [isRating, setIsRating] = useState(false);
  const [value, setValue] = useState(5);

  const handleRating = () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để đánh giá", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
      });
      return;
    }
    setIsRating(!isRating);
  };

  return (
    <Wrapper>
      <div className="product-review-container">
        <div className="review-title">
          {"Đánh giá & nhận xét " + product.name}
        </div>
        <div className="box-review">
          <div className="box-review-score">
            <p>{product?.totalRating}/5</p>
            <Rating
              value={product?.totalRating || 5}
              icon={<FaStar />}
              emptyIcon={<FaRegStar />}
              readOnly
            />
            <div className="number-of-review">
              {product?.ratings.length + " đánh giá"}
            </div>
          </div>
          <div className="box-review-star">
            <div className="rating-level">
              <p>5</p>
              <FaStar className="gold" />
              <progress max="10" value="5"></progress>
              <span>10 đánh giá</span>
            </div>
            <div className="rating-level">
              <p>4</p>
              <FaStar className="gold" />
              <progress max="10" value="0"></progress>
              <span>10 đánh giá</span>
            </div>
            <div className="rating-level">
              <p>3</p>
              <FaStar className="gold" />
              <progress max="10" value="0"></progress>
              <span>10 đánh giá</span>
            </div>
            <div className="rating-level">
              <p>2</p>
              <FaStar className="gold" />
              <progress max="10" value="0"></progress>
              <span>10 đánh giá</span>
            </div>
            <div className="rating-level">
              <p>1</p>
              <FaStar className="gold" />
              <progress max="10" value="0"></progress>
              <span>10 đánh giá</span>
            </div>
          </div>
        </div>

        <div className="btn-review-container">
          <p>Bạn đánh giá sao về sản phẩm này?</p>
          <button
            className="btn-review"
            type="button"
            onClick={() => handleRating()}
          >
            Đánh giá ngay
          </button>
        </div>

        {isRating && (
          <Form method="post" className="form-rating">
            <p>Đánh giá</p>
            <Rating
              name="star"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              icon={<FaStar />}
              emptyIcon={<FaRegStar />}
            />
            <div className="is-flex">
              <input name="productId" defaultValue={product?._id} hidden />
              <textarea name="comment" defaultValue=""></textarea>
              <button type="submit" className="btn">
                Gửi
              </button>
            </div>
          </Form>
        )}

        <div className="box-review-filter"></div>
        <div className="box-review-comment">
          {product?.ratings.length <= 0 ? (
            <div className="btn-review-container">
              <p>Không có đánh giá nào</p>
            </div>
          ) : (
            product?.ratings.map((item) => {
              return (
                <div key={item._id} className="box-review-comment-item">
                  <div className="box-review-comment-item-title">
                    <Avatar
                      sx={{
                        width: 31,
                        height: 31,
                      }}
                      src={item?.postedby.avatar && item?.postedby.avatar}
                    >
                      {!item?.postedby.avatar &&
                        item?.postedby.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    <p className="name">{item?.postedby.fullName}</p>
                    <p>{item?.createdAt}</p>
                  </div>
                  <div className="box-review-comment-item-content">
                    <Rating
                      name="read-only"
                      icon={<FaStar />}
                      emptyIcon={<FaRegStar />}
                      value={item?.star}
                      size="small"
                      readOnly
                    />
                    <p>{item?.comment}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductReview;
