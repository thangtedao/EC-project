import { HelmetProvider } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import moment from "moment";
import Wrapper from "../assets/wrappers/Blog";
import CommentBlog from "../components/commentBlog/CommentBlog";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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

  const submitComment = async (content) => {
    try {
      const user = await customFetch
        .get("/user/current-user")
        .then(({ data }) => data.user);

      await customFetch.post(`/blog/comment/${id}`, {
        author: user.fullName,
        role: user.role,
        content: content,
        byUser: user._id,
      });
    } catch (error) {
      if (error?.response?.status === 401)
        return toast.warning("Vui lòng đăng nhập để bình luận", {
          position: "top-center",
          autoClose: 1000,
          pauseOnHover: false,
        });
      return toast.error(error?.response?.data?.msg);
    }
  };

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
