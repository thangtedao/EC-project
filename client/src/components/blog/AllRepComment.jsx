import React from "react";
import { WechatOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "./Detail.css";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

const AllRepComment = (props) => {
  const { allrepcomment, showRepComment, idComment, user, idBlog } = props;

  const handleDeleteRepComment = async (repComment) => {
    const currentIndex = allrepcomment.findIndex(
      (c) => c._id === repComment._id
    );
    try {
      const confirmDelete = window.confirm("Có chắc muốn xóa không man");
      if (confirmDelete) {
        await customFetch.delete(`/blog/rep/comment/${idBlog}`, {
          repCommentNumber: currentIndex,
          idComment: idComment,
        });
        window.location.reload();
      }
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
    <div className="all-comment-rep-list">
      <div className="arrow-up"></div>
      {allrepcomment.map((repComment) => (
        <div className="all-comment-rep-list-item" key={repComment._id}>
          <div className="all-comment-info">
            {repComment.role == "admin" ? (
              <div className="all-comment-info-name admin">
                <img src="https://cdn.vectorstock.com/i/1000x1000/82/53/white-letter-a-logo-on-red-background-vector-26888253.webp"></img>
              </div>
            ) : (
              <div className="all-comment-info-name">
                {repComment.author.split("")[0]}
                {"T"}
              </div>
            )}
            {repComment.role == "admin" ? (
              <strong>
                {repComment.author} <span>QTV</span>
              </strong>
            ) : (
              <strong>{repComment.author}</strong>
            )}
            <div className="comment-time">
              {moment(repComment.createdAt).format("HH:mm, DD/MM/YYYY")}
            </div>

            {user?.role === "admin" && (
              <div className="comment-status">
                <div
                  className="comment-status-pin"
                  onClick={() => handleDeleteRepComment(repComment)}
                >
                  <DeleteOutlined />
                </div>
              </div>
            )}
          </div>

          <div className="all-comment-content">{repComment.content}</div>

          <div className="all-comment-more">
            <a
              className="all-comment-more-chat"
              onClick={() => showRepComment(idComment)}
            >
              <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRepComment;
