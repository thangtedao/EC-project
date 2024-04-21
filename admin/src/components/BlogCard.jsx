import React from 'react'

import { NavLink } from 'react-router-dom';
import {EditOutlined, DeleteOutlined } from '@ant-design/icons'
import styled from "styled-components";
import moment from 'moment'
import { useNavigate,  } from "react-router-dom";
import customFetch from '../utils/customFetch';


const Wrapper = styled.div`
  width: 60vw;
  height: 25vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-secondary-color);
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  padding: 0.5rem;
  margin: 15px;

  .blog-card-container {
    width: 100%;
    height: 100%;
    background-color: var(--background-secondary-color);
    display: flex;
    padding-top: 1.2rem;
    /* overflow: hidden; */
    gap: 1rem;
    position: relative;

  }
  .blog-card-header-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .blog-card-image {
    height: 135px;
    display: grid;
    place-items: center;
    img {
      border-radius: 10px;
      height: inherit;
    }
  }
  .blog-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
    margin: 10px;
  }
  .blog-card-lastupdated{
    color: rgb(100, 97, 97);
        
  }
  .blog-card-end{
    position: absolute;
    font-size: 30px;
    right:-40px;
    bottom:0
  }
  .blog-card-delete{
    margin-top: 20px;
  }
`;


const BlogCard = (blog) => {
  const blogPost =blog.blog
const navigate = useNavigate()

  const handleEdit =() =>{
    navigate(`/edit-blog/${blogPost._id}`)
  }
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Có chắc muốn xóa không man');
    if (confirmDelete) {
      try {
        await customFetch.delete(`/blog/${blogPost._id}`);
        // Optionally, you can trigger a reload of blogs here or handle other UI updates
        navigate("/all-blogs")
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };
  return (
    <Wrapper>
      <div
        className="blog-card-container"
      >
        <div className="blog-card-image">
          <img src= {blogPost.imageTitle}  alt='Image' />
        </div>
        <div className="blog-card-header-right">
            <div className="blog-card-title">{blogPost.title}</div>
            <div className="blog-card-lastupdated"> Last updated: {moment(blogPost.updatedAt).format('HH:mm, DD/MM/YYYY')}</div>
        </div>
        <div className='blog-card-end'>
            <div className='blog-card-edit' onClick={handleEdit}>
                <EditOutlined />
            </div>
            <div className='blog-card-delete' onClick={handleDelete}>
                <DeleteOutlined />
            </div>
        </div>
          
      </div>

    </Wrapper>
  )
}

export default BlogCard