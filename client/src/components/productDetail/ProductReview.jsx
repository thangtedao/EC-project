import styled from "@emotion/styled";
import React, { useState } from "react";
import img from "../../assets/react.svg";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";
import { Form } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Wrapper = styled.div`
  width: 100%;

  // TOP
  .product-review-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid lightgray;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
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
    padding: 0.3rem;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
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
    border: transparent;
    cursor: pointer;
  }

  // BOT
  .box-review-comment {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .box-review-comment-item {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .box-review-comment-item-title {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    gap: 1rem;
  }
  .round-img {
    border-radius: 50%;
  }
  .box-review-comment-item-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-left: 3.5rem;
    padding-top: 1rem;
  }
`;

const ProductReview = ({ product }) => {
  const [isRating, setIsRating] = useState(false);

  const handleRating = () => {
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
            <p>5/5</p>
            <Rating name="read-only" value={5} size="small" readOnly />
            <div className="number-of-review">99 đánh giá</div>
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
          <Form>
            <ReactStars
              count={5}
              //onChange={ratingChanged}
              size={24}
              edit={true}
              activeColor="#ffd700"
              value={5}
              name="star"
            />
            <textarea name="comment"></textarea>
            <button type="submit" className="btn">
              Gửi
            </button>
          </Form>
        )}

        <div className="box-review-filter"></div>
        <div className="box-review-comment">
          <div className="box-review-comment-item">
            <div className="box-review-comment-item-title">
              <img src={img} alt="avatar" className="round-img" />
              <p>Xuan Thang</p>
              <p>27/8/2023 00:06</p>
            </div>
            <div className="box-review-comment-item-content">
              <Rating name="read-only" value={5} size="small" readOnly />
              <p>Em đặt con Macbook air m1 đến tp hà tĩnh thì</p>
            </div>
          </div>

          <div className="box-review-comment-item">
            <div className="box-review-comment-item-title">
              <img src={img} alt="avatar" className="round-img" />
              <p>Xuan Thang</p>
              <p>27/8/2023 00:06</p>
            </div>
            <div className="box-review-comment-item-content">
              <Rating name="read-only" value={5} size="small" readOnly />
              <p>Em đặt con Macbook air m1 đến tp hà tĩnh thì</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductReview;
