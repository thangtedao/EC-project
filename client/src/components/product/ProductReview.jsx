import Wrapper from "../../assets/wrappers/ProductReview";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import moment from "moment";
import {
  WechatOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import customFetch from "../../utils/customFetch";
import { useSelector } from "react-redux";

const ProductReview = ({
  product,
  reviews,
  submitReview,
  replyReview,
  deleteReplyReview,
}) => {
  const [isRating, setIsRating] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [star, setStar] = useState(5);
  const [content, setContent] = useState();
  const [replyContent, setReplyContent] = useState();

  const user = useSelector((state) => state.user.user);

  const totalStar =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length || 5;

  const handleRating = async () => {
    try {
      await customFetch.get("/user/current-user").then(({ data }) => data.user);

      setIsRating(!isRating);
    } catch (error) {
      if (error?.response?.status === 401)
        return toast.warning("Đăng nhập để đánh giá", {
          position: "top-center",
          autoClose: 1000,
          pauseOnHover: false,
        });
    }
  };

  const handleReply = async () => {
    try {
      await customFetch.get("/user/current-user").then(({ data }) => data.user);

      setIsReply(!isReply);
    } catch (error) {
      if (error?.response?.status === 401)
        return toast.warning("Đăng nhập để đánh giá", {
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
            <span style={{ fontSize: "1.5rem", fontWeight: "700" }}>
              {totalStar}/5
            </span>

            <Rating
              style={{ fontSize: "1.2rem" }}
              value={totalStar || 5}
              icon={<FaStar />}
              emptyIcon={<FaRegStar />}
              readOnly
            />

            <span>{reviews.length + " đánh giá"}</span>
          </div>

          <div className="box-review-star">
            <div className="rating-level">
              <span className="star-number">5</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 5) return acc + 1;
                  else return acc;
                }, 0)}
              />
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 5) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>

            <div className="rating-level">
              <span className="star-number">4</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 4) return acc + 1;
                  else return acc;
                }, 0)}
              />
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 4) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>

            <div className="rating-level">
              <span className="star-number">3</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 3) return acc + 1;
                  else return acc;
                }, 0)}
              />
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 3) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>

            <div className="rating-level">
              <span className="star-number">2</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 2) return acc + 1;
                  else return acc;
                }, 0)}
              />
              <span>
                {reviews.reduce((acc, item) => {
                  if (item.rating === 2) return acc + 1;
                  else return acc;
                }, 0) + " đánh giá"}
              </span>
            </div>

            <div className="rating-level">
              <span className="star-number">1</span>
              <FaStar className="gold" />
              <progress
                max={reviews.length}
                value={reviews.reduce((acc, item) => {
                  if (item.rating === 1) return acc + 1;
                  else return acc;
                }, 0)}
              />
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
            <Rating
              style={{ width: "fit-content" }}
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
                onClick={() => [
                  submitReview(star, content),
                  setIsRating(false),
                ]}
                className="btn"
              >
                Gửi
              </button>
            </div>
          </div>
        )}

        <div className="box-review-comment">
          {reviews.length <= 0 ? (
            <div className="btn-review-container">
              <span>Không có đánh giá nào</span>
            </div>
          ) : (
            reviews.map((item) => {
              return (
                <div key={item._id}>
                  <div className="box-review-comment-item">
                    <div className="box-review-comment-item-title">
                      <Avatar className="avatar" src={item.user.avatar}>
                        {!item.user.avatar &&
                          item.user.fullName.charAt(0).toUpperCase()}
                      </Avatar>

                      <span className="name">{item.user.fullName}</span>

                      <span className="time">
                        <ClockCircleOutlined />
                        {moment(item.updatedAt).format("HH:mm, DD/MM/YYYY")}
                      </span>
                    </div>

                    <div className="box-review-comment-item-content">
                      <Rating
                        style={{ fontSize: "0.9rem" }}
                        icon={<FaStar />}
                        emptyIcon={<FaRegStar />}
                        value={item.rating}
                        readOnly
                      />

                      <span className="content">{item.content}</span>

                      {user?.role === "admin" && (
                        <div
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            gap: 10,
                            color: "#e11b1e",
                          }}
                          onClick={() => handleReply()}
                        >
                          <WechatOutlined />
                          <span> Trả lời</span>
                        </div>
                      )}
                    </div>

                    {isReply && (
                      <div className="form-reply">
                        <div className="is-flex">
                          <textarea
                            required
                            onChange={(event) =>
                              setReplyContent(event.target.value)
                            }
                            value={replyContent}
                          />
                          <button
                            onClick={() => [
                              replyReview(replyContent, item._id),
                              setIsReply(false),
                            ]}
                            className="btn"
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {item.replies?.length > 0 &&
                    item.replies.map((reply) => {
                      return (
                        <div
                          key={reply._id}
                          className="box-review-comment-item"
                          style={{ marginLeft: "2.5rem" }}
                        >
                          <div className="box-review-comment-item-title">
                            {reply.byUser.role !== "admin" ? (
                              <Avatar
                                className="avatar"
                                src={reply.byUser.avatar}
                              >
                                {!reply.byUser.avatar &&
                                  reply.byUser.fullName
                                    ?.charAt(0)
                                    .toUpperCase()}
                              </Avatar>
                            ) : (
                              <Avatar className="avatar" src="#"></Avatar>
                            )}

                            <span className="name">
                              {reply.byUser.fullName}
                            </span>

                            {reply.byUser?.role === "admin" && (
                              <span
                                style={{
                                  color: "#fff",
                                  fontWeight: "700",
                                  fontSize: "0.8rem",
                                  background: "#e04040",
                                  padding: 2,
                                }}
                              >
                                QTV
                              </span>
                            )}

                            <span className="time">
                              <ClockCircleOutlined />
                              {moment(reply.createdAt).format(
                                "HH:mm, DD/MM/YYYY"
                              )}
                            </span>
                          </div>

                          <div className="box-review-comment-item-content">
                            <span className="content">{reply.content}</span>
                          </div>
                        </div>
                      );
                    })}
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
