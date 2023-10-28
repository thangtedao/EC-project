import styled from "@emotion/styled";
import React from "react";
import img from "../../assets/react.svg";

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
    background: red;
    color: white;
    border-radius: 10px;
    border: transparent;
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

const ProductReview = () => {
  return (
    <Wrapper>
      <div className="product-review-container">
        <p>Đánh giá & nhận xét ???</p>
        <div className="box-review">
          <div className="box-review-score">
            <p>5/5</p>
            <div className="item-star">*****</div>
            <div className="number-of-review">99 đánh giá</div>
          </div>
          <div className="box-review-star">
            <div className="rating-level">
              <p>5</p>
              <progress max="10" value="5"></progress>
              <p>10 đánh giá</p>
            </div>
            <div className="rating-level">
              <p>4</p>
              <progress max="10" value="0"></progress>
              <p>10 đánh giá</p>
            </div>
            <div className="rating-level">
              <p>3</p>
              <progress max="10" value="0"></progress>
              <p>10 đánh giá</p>
            </div>
            <div className="rating-level">
              <p>2</p>
              <progress max="10" value="0"></progress>
              <p>10 đánh giá</p>
            </div>
            <div className="rating-level">
              <p>1</p>
              <progress max="10" value="0"></progress>
              <p>10 đánh giá</p>
            </div>
          </div>
        </div>

        <div className="btn-review-container">
          <p>Bạn đánh giá sao về sản phẩm này?</p>
          <button className="btn-review">Đánh giá ngay</button>
        </div>

        <div className="box-review-filter"></div>
        <div className="box-review-comment">
          <div className="box-review-comment-item">
            <div className="box-review-comment-item-title">
              <img src={img} alt="avatar" className="round-img" />
              <p>Xuan Thang</p>
              <p>27/8/2023 00:06</p>
            </div>
            <div className="box-review-comment-item-content">
              <div className="item-star">*****</div>
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
              <div className="item-star">*****</div>
              <p>Em đặt con Macbook air m1 đến tp hà tĩnh thì</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductReview;
