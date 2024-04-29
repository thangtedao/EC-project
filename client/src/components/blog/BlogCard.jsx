import React from "react";
import Wrapper from "../../assets/wrappers/BlogCard.js";
import { NavLink } from "react-router-dom";
import moment from "moment";

const BlogCard = ({ blog }) => {
  return (
    <Wrapper>
      <NavLink to={`/blog/${blog._id}`} className="blog-card-container">
        <div className="blog-card-image">
          <img src={blog.imageTitle} alt="Image" />
        </div>

        <div className="blog-card-header-right">
          <div className="blog-card-title">{blog.title}</div>

          <div className="blog-card-lastupdated">
            Ngày đăng: {moment(blog.createdAt).format("HH:mm, DD/MM/YYYY")}
          </div>
        </div>
      </NavLink>
    </Wrapper>
  );
};

export default BlogCard;
