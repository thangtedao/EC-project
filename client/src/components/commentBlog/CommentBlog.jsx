import React, { useState, useEffect } from 'react';
import { Col} from 'antd';
import {useDispatch, useSelector} from 'react-redux'
// import { commentProduct, getproductById } from '../../actions/ProductAction';
import {useParams} from 'react-router-dom'
import './Detail.css';
import AllComment from './AllComment';
import customFetch from '../../utils/customFetch';

function CommentBlog(props) {
  const {id} = useParams()
  // const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const {blog} = props
  // const allComment = blog.comments
  // const {userInfo} = useSelector(state => state.userSignin)
  const user = useSelector((state) => state.user.user);
  blog.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  
  const Comment = async () => {
    if(!value){
      return
    }
    if(user){
      const comment = {
        author: user.fullName,
        role: user.role,
        content: value,
        byUser: user._id,
      }
      const response = await customFetch.post(`/blog/comment/${id}`, comment)
      console.log(response.comment)
      // dispatch(commentProduct(id, comment))
      setValue('')
    }
    else alert('Đăng nhập đi bạn êiiiii')
  }
  // useEffect(() => {
  //   dispatch(getproductById(id))
  // }, [])

    return (
      <div className='comment'>
        <Col span={18} align='start' style={{ alignItems:'center'}} xs={24} sm={24} md={18}>
          <div className="comment-area" style={{display: 'flex', alignItems:'center'}}>
            <textarea placeholder='Hãy cùng mọi người thảo luận về bài viết này nhé.' rows={10} cols={3} value={value} onChange={(e) => setValue(e.target.value)}></textarea>
          </div>
          <div className="comment-send">
            <button onClick={() => Comment()}>Gửi</button>
          </div>
        </Col>

        <AllComment allComment={blog.comments}></AllComment>
      </div>

    )
}

export default CommentBlog;