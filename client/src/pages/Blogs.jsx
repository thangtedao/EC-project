import BlogCard from "../components/blog/BlogCard";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  .title {
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 25px;
  }
`;

export const loader = async () => {
  try {
    const blogs = await customFetch
      .get("/blog/all-blogs")
      .then(({ data }) => data);
    window.scrollTo(0, 0);
    return { blogs };
  } catch (error) {
    return error;
  }
};

const Blogs = () => {
  const { blogs } = useLoaderData();

  return (
    <Wrapper>
      <div>
        <div className="title">Bản tin công nghệ</div>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </Wrapper>
  );
};

export default Blogs;
