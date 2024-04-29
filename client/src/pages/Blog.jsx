import { HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import moment from "moment";
import Wrapper from "../assets/wrappers/Blog";
import CommentBlog from "../components/blog/CommentBlog";
import customFetch from "../utils/customFetch";

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    const blog = await customFetch.get(`/blog/${id}`).then(({ data }) => data);
    window.scrollTo(0, 0);
    return { blog };
  } catch (error) {
    return error;
  }
};

const Blog = () => {
  const { blog } = useLoaderData();

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
                  Ngày đăng:{" "}
                  {moment(blog.createdAt).format("HH:mm, DD/MM/YYYY")}
                </div>
              </div>
            </div>

            <div className="blog-content">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </div>
        </div>

        <CommentBlog blog={blog} />
      </Wrapper>
    </HelmetProvider>
  );
};

export default Blog;
