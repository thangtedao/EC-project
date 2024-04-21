import styled from "@emotion/styled";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

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

const ProductReview = ({ product, reviews, submitReview }) => {
  const [isRating, setIsRating] = useState(false);
  const [star, setStar] = useState(5);
  const [content, setContent] = useState();

  const totalStar =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  const handleRating = async () => {
    try {
      await customFetch.get("/user/current-user").then(({ data }) => data.user);

      setIsRating(!isRating);
    } catch (error) {
      if (error?.response?.status === 401)
        return toast.warning("Vui lòng đăng nhập để đánh giá", {
          position: "top-center",
          autoClose: 1000,
          pauseOnHover: false,
        });
    }
  };

  return (
    <Wrapper>
      <div className="product-review-container">
        <div className="review-title">
          {"Đánh giá & nhận xét " + product.name}
        </div>
        <div className="box-review">
          <div className="box-review-score">
            <span>{totalStar}/5</span>
            <Rating
              value={99 || 5}
              icon={<FaStar />}
              emptyIcon={<FaRegStar />}
              readOnly
            />
            <div className="number-of-review">
              {reviews.length + " đánh giá"}
            </div>
          </div>

          <div className="box-review-star">
            <div className="rating-level">
              <span>5</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 5) return acc + 1;
                  else return acc;
                }, 0)}
              ></progress>
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 5) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>
            <div className="rating-level">
              <span>4</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 4) return acc + 1;
                  else return acc;
                }, 0)}
              ></progress>
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 4) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>
            <div className="rating-level">
              <span>3</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 3) return acc + 1;
                  else return acc;
                }, 0)}
              ></progress>
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 3) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>
            <div className="rating-level">
              <span>2</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 2) return acc + 1;
                  else return acc;
                }, 0)}
              ></progress>
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 2) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>
            <div className="rating-level">
              <span>1</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 1) return acc + 1;
                  else return acc;
                }, 0)}
              ></progress>
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 1) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>
          </div>
        </div>

        <div className="btn-review-container">
          <span>Bạn đánh giá sao về sản phẩm này?</span>
          <button
            className="btn-review"
            type="button"
            onClick={() => handleRating()}
          >
            Đánh giá ngay
          </button>
        </div>

        {isRating && (
          <div className="form-rating">
            <span>Đánh giá</span>
            <Rating
              name="star"
              value={star}
              onChange={(event, newValue) => {
                setStar(newValue);
              }}
              icon={<FaStar />}
              emptyIcon={<FaRegStar />}
            />
            <div className="is-flex">
              <textarea
                required
                onChange={(event) => setContent(event.target.value)}
                value={content}
              />
              <button
                onClick={() => submitReview(star, content)}
                className="btn"
              >
                Gửi
              </button>
            </div>
          </div>
        )}

        <div className="box-review-filter"></div>
        <div className="box-review-comment">
          {reviews.length <= 0 ? (
            <div className="btn-review-container">
              <span>Không có đánh giá nào</span>
            </div>
          ) : (
            reviews.map((item) => {
              return (
                <div key={item._id} className="box-review-comment-item">
                  <div className="box-review-comment-item-title">
                    <Avatar
                      sx={{
                        width: 31,
                        height: 31,
                      }}
                      src={item.user.avatar}
                    >
                      {!item.user.avatar &&
                        item.user.fullName.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="name">{item.user.fullName}</span>
                    <span>
                      {item?.updatedAt.split("T")[0] +
                        " " +
                        item.updatedAt.split("T")[1].split(".")[0]}
                    </span>
                  </div>
                  <div className="box-review-comment-item-content">
                    <Rating
                      name="read-only"
                      icon={<FaStar />}
                      emptyIcon={<FaRegStar />}
                      value={item.rating}
                      size="small"
                      readOnly
                    />
                    <span>{item.content}</span>
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
