import React, { useState } from "react";
import { Col } from "antd";
import "./Detail.css";
import AllComment from "./AllComment";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch.js";
import { useParams } from "react-router-dom";

const CommentBlog = (props) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { blog } = props;
  blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const submitComment = async () => {
    try {
      const user = await customFetch
        .get("/user/current-user")
        .then(({ data }) => data.user);

      await customFetch.post(`/blog/comment/${id}`, {
        author: user.fullName,
        role: user.role,
        content: comment,
        byUser: user._id,
      });
      window.location.reload();
    } catch (error) {
      if (error?.response?.status === 401)
        return toast.warning("Đăng nhập để bình luận", {
          position: "top-center",
          autoClose: 1000,
          pauseOnHover: false,
        });
      return toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <div className="comment">
      <Col
        span={18}
        align="start"
        style={{ alignItems: "center" }}
        xs={24}
        sm={24}
        md={18}
      >
        <div
          className="comment-area"
          style={{ display: "flex", alignItems: "center" }}
        >
          <textarea
            placeholder="Hãy cùng mọi người thảo luận về bài viết này nhé."
            rows={10}
            cols={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="comment-send">
          <button onClick={() => submitComment()}>Gửi</button>
        </div>
      </Col>

      <AllComment allComment={blog.comments} />
    </div>
  );
};

export default CommentBlog;
