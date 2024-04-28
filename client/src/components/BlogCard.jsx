import React from 'react'

import Wrapper from "../assets/wrappers/BlogCard.js";
import { NavLink } from 'react-router-dom';
import moment from 'moment';



const BlogCard = (blog) => {
  const blogPost =blog.blog
  return (
    <Wrapper>
      <NavLink
        to={`../blog/${blogPost._id}`}
        className="blog-card-container"
      >
        <div className="blog-card-image">
          <img src= {blogPost.imageTitle}  alt='Image' />
        </div>
        <div className="blog-card-header-right">
            <div className="blog-card-title">{blogPost.title}</div>
            <div className="blog-card-lastupdated"> Ngày đăng: {moment(blogPost.createdAt).format('HH:mm, DD/MM/YYYY')}</div>
        </div>
          
      </NavLink>

    </Wrapper>
  )
}

export default BlogCard