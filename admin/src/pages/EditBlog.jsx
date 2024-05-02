import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import customFetch from "../utils/customFetch";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrapper/blog/EditBlog.js";
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

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-blogs");
    }
    const response = await customFetch.get(`/blog/${id}`);

    return { blog: response.data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const EditBlog = () => {
  //Lú vậy
  //   const { id } = useParams();
  // //   const [blog, setBlog] = useState({});
  //   const [initialValues, setInitialValues] = useState({});
  //   const editorRef = useRef(null);
  //   const [form] = Form.useForm();
  //   const navigate = useNavigate()

  //   useEffect(() => {
  //     const fetchBlog = async () => {
  //       try {
  //         const response = await customFetch.get(`/blog/${id}`);
  //         // console.log(response.data.blog.title)
  //         setInitialValues({
  //           title: response.data.blog.title,
  //           image: response.data.blog.imageTitle,
  //           description: response.data.blog.description,
  //           content: response.data.blog.content,
  //         });
  //       } catch (error) {
  //         console.error('Error fetching blog:', error);
  //       }
  //     };
  //     if(id){
  //         fetchBlog();
  //         console.log(initialValues)
  //     }
  //   }, []);
  //   useEffect(() => {
  //     if (initialValues) {
  //       form.setFieldsValue(initialValues); // Cập nhật giá trị của các trường nhập liệu khi initialValues được thiết lập
  //     }
  //   }, [form, initialValues]);

  //   const onFinish = async (values) => {
  //     const blogContent = String(editorRef.current.getContent());
  //     const data = {
  //       title: values.title,
  //       imageTitle: values.image,
  //       description: values.description,
  //       content: blogContent,
  //       comments: [],
  //     };

  //     try {
  //       const response = await customFetch.patch(`/blog/update/${id}`, data);
  //       // console.log(response);
  //       navigate("/all-blogs")
  //     } catch (error) {
  //       console.error('Error creating blog:', error);
  //     }
  //   };

  const navigate = useNavigate();
  const { blog } = useLoaderData();
  const [blogContent, setBlogContent] = useState(blog.content || "");

  const blogChange = () => {
    if (editorRef.current) {
      const content = String(editorRef.current.getContent());
      setBlogContent(content);
    }
  };

  const editorRef = useRef(null);
  //
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

      const response = await customFetch.patch(
        `/blog/update/${blog._id}`,
        data
      );
      if (response.data) navigate("/all-blogs");
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
              title: "Edit Blog",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Blog</title>
        </Helmet>
        <div className="title">Edit Blog</div>

        <Form
          name="basic"
          onFinish={onFinish}
          initialValues={{
            title: blog.title,
            description: blog.description,
            merelink: blog.imageTitle,
          }}
        >
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
                    initialValue={blogContent}
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

export default EditBlog;
