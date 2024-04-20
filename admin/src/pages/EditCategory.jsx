import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import {
  Modal,
  Button,
  Select,
  Form,
  Input,
  Typography,
  Card,
  Breadcrumb,
} from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

const Wrapper = styled.div`
  width: 100%;
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #f3f3f3;
    padding: 1 rem;
    height: 60px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-category");
    }
    const { category, categoryBlog } = await customFetch
      .get(`/category/${id}`)
      .then(({ data }) => data);
    let categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);
    if (categories) categories = categories?.filter((item) => item._id !== id);
    return { category, categories, categoryBlog };
  } catch (error) {
    return error;
  }
};

const EditCategory = () => {
  const { category, categories, categoryBlog } = useLoaderData();
  const navigate = useNavigate();

  console.log(categoryBlog);

  // Category blog
  const [blog, setBlog] = useState(categoryBlog?.content || "");
  const editorRef = useRef(null);
  const blogChange = () => {
    if (editorRef.current) {
      const blogContent = String(editorRef.current.getContent());
      setBlog(blogContent);
    }
  };

  //Modal
  const [open, setModalOpen] = useState(false);
  //Mở Modal (Confirm box)
  const showModal = () => {
    setModalOpen(true);
  };
  //Đóng Modal sau khi xác nhận
  const handleOk = () => {
    setModalOpen(false);
  };
  //Đóng Modal sau khi xác nhận
  //Đóng ReviewOpen sau khi xác nhận
  const handleCancel = () => {
    setModalOpen(false);
  };

  const onFinish = async (values) => {
    console.log("Success:", values);
    if (!values.parent) delete values.parent;
    const response = await customFetch.patch(
      `/category/update/${category._id}`,
      values
    );
    if (response) navigate("/all-category");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: <a onClick={() => navigate("/all-category")}>Category</a>,
            },
            {
              title: "Edit Category",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Category</title>
        </Helmet>

        <div className="title">Edit Category</div>

        <Form
          initialValues={{
            name: category?.name,
            slug: category?.slug,
            description: category?.description,
            parent: category?.parent,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Category information`}
              >
                <div>
                  {/* INFORMATION FIELDS */}
                  <div>
                    <Typography.Title className="input-title">
                      Name
                    </Typography.Title>
                    <Form.Item name="name">
                      <Input
                        required
                        size="large"
                        placeholder="Enter Category Name"
                      />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Category Slug
                    </Typography.Title>
                    <Form.Item name="slug">
                      <Input
                        required
                        size="large"
                        placeholder="Enter Category Slug"
                      />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Description
                    </Typography.Title>
                    <Form.Item name="description">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your description..."
                        autoSize={{
                          minRows: 7,
                          maxRows: 9,
                        }}
                      />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Blog
                    </Typography.Title>
                    <Form.Item>
                      <Editor
                        // apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
                        apiKey="jbmjv3n0hzwml063re0ackyls29g62lc76t23ptagoco48ip"
                        language="vi"
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={blog}
                        init={{
                          height: 500,
                          menubar:
                            "file edit view insert format tools table tc help",
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                        onChange={blogChange}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Parent */}
              <Card className="col-2-item" size="large" title={`Parent`}>
                <Typography.Title className="input-title">
                  Category parent
                </Typography.Title>
                <Form.Item name="parent">
                  <Select
                    allowClear
                    size="large"
                    placeholder="Select Parent"
                    options={categories?.map((item) => {
                      return {
                        value: item._id,
                        label: item.name,
                      };
                    })}
                  />
                </Form.Item>
              </Card>
            </div>
          </div>

          {/* BUTTON SUBMIT */}
          <div className="btn">
            <Button
              danger
              size="large"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want to cancel?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Cancel
            </Button>

            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditCategory;
