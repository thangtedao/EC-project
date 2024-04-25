import { useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Wrapper from "../assets/wrappers/Blog";
import CommentBlog from "../components/commentBlog/CommentBlog";
import customFetch from "../utils/customFetch";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Thêm biến trạng thái isLoading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/blog/${id}`);
        const data = response.data.blog;
        setBlog(data);
        setIsLoading(false); // Dữ liệu đã được fetch xong
      } catch (error) {
        console.error("Error fetching data blog:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <HelmetProvider>
      <Wrapper>
        <div id="blog">
          <div className="blog">
            <div className="blog-header">
              <div className="blog-image">
                <img src={blog.imageTitle} alt="" />
              </div>
              <div className="blog-header-right">
                <div className="blog-title">{blog.title}</div>
                <div className="blog-lastupdated">
                  Last updated: {moment(blog.updatedAt).format("HH:mm, DD/MM/YYYY")}
                </div>
              </div>
            </div>
            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </div>
        {!isLoading && <CommentBlog blog={blog} />} {/* Hiển thị CommentBlog khi isLoading là false */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Blog;
