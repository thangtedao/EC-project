import React from 'react'
import customFetch from '../utils/customFetch';
import { useEffect } from 'react';
import { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useNavigate  } from "react-router-dom";

const CommentBlogMng = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(`blog/allblogswithnewcomment`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeenPost = async (blog) =>{
    const data = {
      hasNewComment:false
    };

    try {
      const response = await customFetch.patch(`/blog/update/${blog._id}`, data);
      // console.log(response);
      window.open(`http://localhost:5173/blog/${blog._id}`, 'blank')
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  }

  return (
    <div>
    Các bài đăng có bình luận chưa đọc mới nhất:
      {blogs.map((blog) => (
        <div key={blog._id} onClick={()=>handleSeenPost(blog)} >
          <BlogCard key={blog._id} blog={blog} isInNotification={true}/>
        </div>
      ))}
    </div>
  );
};

export default CommentBlogMng;