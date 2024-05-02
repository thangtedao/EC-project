import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import moment from "moment";
import Wrapper from "../assets/wrapper/blog/AllBlog";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Typography, Image, Breadcrumb, Button, Divider } from "antd";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Có chắc muốn xóa không man");
    if (confirmDelete) {
      try {
        await customFetch.delete(`/blog/${id}`);
        navigate("/all-blogs");
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customFetch.get(`blog/all-blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Blog</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },

            {
              title: "Blog",
            },
          ]}
        />
        <div className="title">Blog</div>
        {/* List Blog */}
        <List
          itemLayout="horizontal"
          dataSource={blogs}
          renderItem={(blog) => (
            <List.Item
              key={blog._id}
              style={{
                display: "grid",
                gridTemplateColumns: "8fr 1fr",
                // gridGap: "8px",
                alignItems: "center",
              }}
              // onClick={() => navigate(`/edit-blog/${blog._id}`)}
            >
              <List.Item.Meta
                avatar={<Image width={200} src={blog.imageTitle} />}
                title={<a>{blog.title}</a>}
                description={
                  <div>
                    dể 1 đoạn đầu trong blog hiện ở đây cho bớt trống một này nọ
                    ta cùng ta vui vui vui vui vuiiiiiiii cmn
                    ahahahahahahahahahahahaaaaaaaaaaaaaaaaaaaaaaaaaa
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa....
                    <br />
                    <Typography.Text>
                      Ngày đăng:{" "}
                      {moment(blog.createdAt).format("HH:mm, DD/MM/YYYY")}
                    </Typography.Text>
                  </div>
                }
              />

              <div className="main-btn">
                <div className="btn-item" style={{ textAlign: "center" }}>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(blog._id)}
                  >
                    Edit
                  </Button>
                </div>
                <Divider />
                <div className="btn-item" style={{ textAlign: "center" }}>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
        {/* <div>
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllBlogs;
