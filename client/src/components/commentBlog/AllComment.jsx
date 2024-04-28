import React, { useState } from "react";
import { Col } from "antd";
import { WechatOutlined, DeleteOutlined  } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

// import {
//   pinCommentProduct,
//   repCommentProduct,
// } from "../../actions/ProductAction";
import { useParams } from "react-router-dom";
import AllRepComment from "./AllRepComment";

import customFetch from "../../utils/customFetch";
import { getFirstCharacterUser } from "../../utils/blog";
import axios from "axios";

function AllComment(props) {
  const { id } = useParams();
  const { allComment } = props;
  // const dispatch = useDispatch();
  const [repCmt, setRepCmt] = useState({ key: "", status: false });
  const user = useSelector((state) => state.user.user);
  const [repValue, setRepValue] = useState("");
  const showRepComment = (id) => {
    setRepCmt({ key: id, status: !repCmt.status });
  };
  const handleRepComment = async () => {
    if (user) {
      const comment = {
        idComment: repCmt.key,
        role: user.role,
        content: repValue,
        author: user.fullName,
      };
      const response = await customFetch.post(`/blog/rep/comment/${id}`, comment)
      console.log(response.comment)
      setRepValue("");
      setRepCmt({ key: "", status: false });
    } else alert("Đăng nhập đi bạn eiii");
  };

  const handleDeleteComment = async (comment) => {
    const currentIndex = allComment.findIndex((c) => c._id === comment._id);
    try {
      const confirmDelete = window.confirm('Có chắc muốn xóa không man');
      if (confirmDelete) {
        try {
          await fetch(`http://localhost:3001/api/blog/comment/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              commentNumber: currentIndex,
              id:id
            })
          });
          window.location.reload();
        } catch (error) {
          console.error('Error deleting blog comment:', error);
        }
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  

  return (
    <div className="all-comment">
      {allComment.map((comment) => (
        <div key={comment._id}>
          <Col span={18} style={{ marginTop: "1rem" }} xs={24} sm={24} md={18} className="comment-section">
            <div className="all-comment-info">
              <div style={{ display: "flex" }}>
                {comment.role=='admin' ? (
                  <div className="all-comment-info-name admin">
                    <img src="https://cdn.vectorstock.com/i/1000x1000/82/53/white-letter-a-logo-on-red-background-vector-26888253.webp"></img>
                  </div>
                ) : (
                  <div className="all-comment-info-name">
                    {getFirstCharacterUser(comment.author)}
                  </div>
                )}
                {comment.role=='admin' ? (
                  <strong>
                    {comment.author} <span>QTV</span>
                  </strong>
                ) : (
                  <strong className='user-name'>{comment.author}</strong>
                )}
                <div className="comment-time">{moment(comment.createdAt).format('HH:mm, DD/MM/YYYY')}</div>
              </div>
              {user.role=='admin' && (
                <div className="comment-status">
                  <div
                    className="comment-status-pin"
                     onClick={() => handleDeleteComment(comment)}
                  >
                    <DeleteOutlined />
                  </div>
                </div>
              )}
            </div>
            <div className="all-comment-content">{comment.content}</div>
            <div className="all-comment-more">
              <a
                className="all-comment-more-chat"
                onClick={() => showRepComment(comment._id)}
              >
                <WechatOutlined style={{ color: "#e11b1e" }} /> <p> Trả lời</p>
              </a>
            </div>
            {comment.replies.length > 0 ? (
              <AllRepComment
                allrepcomment={comment.replies}
                showRepComment={showRepComment}
                idComment={comment._id}
                user = {user}
                idBlog = {id}
              ></AllRepComment>
            ) : (
              ""
            )}
          </Col>
          {repCmt.status === true && repCmt.key === comment._id ? (
            <Col
              span={18}
              xs={24}
              md={18}
              align="start"
              style={{
                alignItems: "center",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
              className="comment-rep-replies"
            >
              <div
                className="comment-area"
                style={{ display: "flex", alignItems: "center" }}
              >
                <textarea
                  placeholder="trả lời bình luận."
                  rows={10}
                  cols={3}
                  value={repValue}
                  onChange={(e) => setRepValue(e.target.value)}
                ></textarea>
              </div>

              <div className="comment-send">
                <button onClick={() => handleRepComment()}>Trả lời</button>
              </div>
            </Col>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}

export default AllComment;
