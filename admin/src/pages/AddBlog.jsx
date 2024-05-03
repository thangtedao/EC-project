import { Editor } from "@tinymce/tinymce-react";
import React, { useState, useRef } from "react";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrapper/blog/AddBlog.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PlusOutlined } from "@ant-design/icons";

import {
  Form,
  Card,
  Input,
  Typography,
  Button,
  Breadcrumb,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [blogContent, setBlogContent] = useState("");

  const editorRef = useRef(null);
  const blogChange = () => {
    if (editorRef.current) {
      const content = String(editorRef.current.getContent());
      setBlogContent(content);
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  //

  const onFinish = async (values) => {
    try {
      const data = {
        title: values.title,
        imageTitle: values.merelink,
        description: values.description,
        content: blogContent,
        comments: [],
      };
      const response = await customFetch.post(`/blog/create`, data);
      if (response.data) return navigate("/all-blogs");
    } catch (error) {
      console.log(error);
    }
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
              title: <a onClick={() => navigate("/all-blog")}>Blog</a>,
            },
            {
              title: "Add Blog",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Blog</title>
        </Helmet>
        <div className="title">Add Blog</div>

        <Form name="basic" onFinish={onFinish}>
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Blog information`}
              >
                <Typography.Title className="input-title">
                  Title
                </Typography.Title>
                <Form.Item name="title">
                  <Input required size="large" placeholder="Enter Blog title" />
                </Form.Item>
                <Typography.Title className="input-title">
                  Description
                </Typography.Title>
                <Form.Item name="description">
                  <Input.TextArea
                    required
                    size="large"
                    placeholder="Type your description..."
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
                <Typography.Title className="input-title">
                  Image link
                </Typography.Title>
                <Form.Item name="merelink">
                  <Input.TextArea
                    size="large"
                    placeholder="Enter link image"
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </Form.Item>
                <Form.Item name="image" label="Images">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    maxCount={5}
                    multiple
                  >
                    {fileList.length >= 5 ? null : uploadButton}
                  </Upload>
                </Form.Item>
              </Card>
            </div>

            <div
              className="col-2"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Card className="col-2-item" size="large" title={`Content`}>
                <Typography.Title className="input-title">
                  Blog content
                </Typography.Title>
                <Form.Item name="content">
                  <Editor
                    // apiKey="cmlltcvw2ydrtenwdgwdwqqrvsje6foe8t5xtyaq6lo2ufki"
                    apiKey="jbmjv3n0hzwml063re0ackyls29g62lc76t23ptagoco48ip"
                    language="vi"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={""}
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
              </Card>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="btn">
              <Button danger size="large">
                Cancel
              </Button>

              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddBlog;
