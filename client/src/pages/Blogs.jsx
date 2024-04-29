import BlogCard from "../components/blog/BlogCard";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

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
    <div>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
