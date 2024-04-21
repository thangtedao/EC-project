// import React from 'react'

import { useParams } from "react-router-dom"
import Wrapper from "../assets/wrappers/Blog"
import { useEffect, useState } from "react"
import customFetch from "../utils/customFetch"
import axios from "axios"
import moment from 'moment'
import { HelmetProvider } from "react-helmet-async"

const Blog = () => {
    const {id} = useParams()
    const [blog, setBlog] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/blog/${id}`);
                const data = response.data.blog;
                // console.log(response.data.blog)
                setBlog(data);
          } catch (error) {
            console.error("Error fetching data blog:", error);
          }
        };
    
        if (id) {
          fetchData();
          console.log(blog)
        }
    }, []);
  return (
    <HelmetProvider>
        <Wrapper>
            <div id='blog'>
                <div className="blog">
                    <div className="blog-header">
                        <div className="blog-image">
                            <img src={blog.imageTitle} alt='' />
                        </div>
                        <div className="blog-header-right">
                            <div className="blog-title">{blog.title}</div>
                            <div className="blog-lastupdated"> Last updated: {moment(blog.updatedAt).format('HH:mm, DD/MM/YYYY')}</div>
                        </div>
                    </div>
                    <div className="blog-content">
                            <div dangerouslySetInnerHTML={{ __html:blog.content}} />
                    </div>
                </div>
            </div>
        </Wrapper>
    </HelmetProvider>
  )
}

export default Blog