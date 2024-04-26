import React from 'react';
import { WechatOutlined } from '@ant-design/icons';
import { getFirstCharacterUser } from '../../utils/blog';
import {  DeleteOutlined  } from "@ant-design/icons";
import moment from 'moment';

import './Detail.css';

function AllRepComment(props) {
  const {allrepcomment, showRepComment, idComment, user, idBlog} = props;
  
  const handleDeleteRepComment = async (repComment) => {
    const currentIndex = allrepcomment.findIndex((c) => c._id === repComment._id);
    console.log(currentIndex)
    try {
      const confirmDelete = window.confirm('Có chắc muốn xóa không man');
      if (confirmDelete) {
        try {
          await fetch(`http://localhost:3001/api/blog/rep/comment/${idBlog}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              repCommentNumber: currentIndex,
              idComment:idComment
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
    <div className="all-comment-rep-list">
      <div className="arrow-up"></div>
      {allrepcomment.map((repComment) => (
        <div className="all-comment-rep-list-item" key={repComment._id}>
          <div className="all-comment-info">
            {repComment.role=='admin' ? (
              <div className="all-comment-info-name admin">
                <img src="https://cdn.vectorstock.com/i/1000x1000/82/53/white-letter-a-logo-on-red-background-vector-26888253.webp"></img>
              </div>
            ) : (
              <div className="all-comment-info-name">
                {getFirstCharacterUser(repComment.author)}
                {'T'}
              </div>
            )}
            {
              repComment.role=='admin' ? (<strong>{repComment.author} <span>QTV</span></strong>): (<strong>{repComment.author}</strong>)
            }
            <div className="comment-time">{moment(repComment.createdAt).format('HH:mm, DD/MM/YYYY')}</div>

            {user.role=='admin' && (
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
}

export default AllRepComment;