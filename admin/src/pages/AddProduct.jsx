import React, { useState, useRef } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/product/AddProduct.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Modal,
  Upload,
  Button,
  Select,
  Form,
  Input,
  Typography,
  InputNumber,
  Card,
  Breadcrumb,
  Space,
  Checkbox,
} from "antd";

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);

    const categoryChild = await customFetch
      .get("/category/get/child")
      .then(({ data }) => data);

    return { categories, categoryChild };
  } catch (error) {
    return error;
  }
};

const AddProduct = () => {
  const { categories, categoryChild } = useLoaderData();
  const navigate = useNavigate();

  // Product blog
  const [blog, setBlog] = useState();
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
    setPreviewOpen(false);
    setModalOpen(false);
  };

  /* Upload Image and Preview */
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

  const onFinish = async (values) => {
    values["blog"] = blog;
    const formData = new FormData();
    if (values.categoryC) {
      values.category = [values.category, ...values.categoryC];
      delete values.categoryC;
    }
    if (values.attributes && Array.isArray(values.attributes)) {
      values.attributes.forEach((attribute, index) => {
        Object.entries(attribute).forEach(([key, value]) => {
          formData.append(`attributes[${index}][${key}]`, value);
        });
      });
      delete values.attributes;
    }
    if (values.variations && Array.isArray(values.variations)) {
      values.variations.forEach((variation, index) => {
        Object.entries(variation).forEach(([key, value]) => {
          formData.append(`variations[${index}][${key}]`, value);
        });
      });
      delete values.variations;
    }
    Object.entries(values).forEach(([key, value]) =>
      formData.append(key, value)
    );
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    const response = await customFetch.post("/product/create", formData);
    if (response) navigate("/all-product");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [categoriesC, setCategoriesC] = useState([]);

  const handleChangeC = (value) => {
    let newCategoriesC = [];
    categoryChild.map((item) => {
      if (item.parent.toString() === value.toString()) {
        newCategoriesC.push(item);
      }
    });
    setCategoriesC(newCategoriesC);
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
              title: <a onClick={() => navigate("/all-product")}>Product</a>,
            },
            {
              title: "Add Product",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Product</title>
        </Helmet>

        <div className="title">Add Product</div>

        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Product information`}
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
                        placeholder="Enter Product Name"
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

                    {/* <Typography.Title className="input-title">
                      Specifications
                    </Typography.Title>
                    <Form.Item name="specifications">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your specifications..."
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
                    </Form.Item> */}

                    <Typography.Title className="input-title">
                      Model
                    </Typography.Title>
                    <Form.Item name="model">
                      <Input required size="large" placeholder="Enter Value" />
                    </Form.Item>
                  </div>
                </div>
              </Card>

              {/* MEDIA FIELDS */}
              <Card className="col-1-item" size="large" title={`Product Image`}>
                <div>
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
                  <Form.Item name="images" label="Images">
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

                  <Form.Item>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="image"
                        style={{
                          width: "100%",
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </div>
              </Card>

              {/* ATTRIBUTE FIELD */}
              <Card className="col-1-item" size="large" title={`Attribute`}>
                <Typography.Title className="input-title">
                  Attribute
                </Typography.Title>
                <Form.List name="attributes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          align="baseline"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "3fr 5fr 1fr 0",
                            marginBottom: 8,
                          }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "attributeName"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing",
                              },
                            ]}
                          >
                            <Input required size="large" placeholder="Name" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "attributeValue"]}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: "Missing Value",
                              },
                            ]}
                          >
                            <Input required size="large" placeholder="Value" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "mainAttribute"]}
                            {...restField}
                            valuePropName="checked"
                            initialValue={false}
                          >
                            <Checkbox />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          New Attribute
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>

              {/* VARIATIONS FIELDS*/}
              <Card className="col-1-item" size="large" title={`Variants`}>
                <Typography.Title className="input-title">
                  Variant
                </Typography.Title>
                <Form.List name="variations">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          align="baseline"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "2fr 5fr 3fr 0",
                            marginBottom: 8,
                          }}
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "variationName"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing",
                              },
                            ]}
                          >
                            {/* <Select
                              size="large"
                              placeholder="Select option"
                              options={[
                                {
                                  value: "Color",
                                  label: "Color",
                                },
                                {
                                  value: "RAM-ROM",
                                  label: "RAM-ROM",
                                },
                              ]}
                            /> */}
                            <Input
                              required
                              size="large"
                              placeholder="Enter Value"
                            />
                          </Form.Item>
                          <Form.Item
                            name={[name, "variationValue"]}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: "Missing Value",
                              },
                            ]}
                          >
                            <Input
                              required
                              size="large"
                              placeholder="Enter Value"
                            />
                          </Form.Item>
                          <Form.Item
                            name={[name, "price"]}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: "Missing Value",
                              },
                            ]}
                          >
                            <InputNumber
                              required
                              style={{ width: "100%" }}
                              size="large"
                              placeholder="eg. 100000"
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          New Variant
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* PRICE FIELD */}
              <Card className="col-2-item" size="large" title={`Price`}>
                <Typography.Title className="input-title">
                  Price
                </Typography.Title>
                <Form.Item name="price">
                  <InputNumber
                    required
                    suffix="VND"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="eg. 100000"
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Sale Price
                </Typography.Title>
                <Form.Item name="salePrice">
                  <InputNumber
                    required
                    suffix="VND"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="eg. 100000"
                  />
                </Form.Item>
              </Card>

              {/* ORGANIZATION FIELD */}
              <Card className="col-2-item" size="large" title={`Category`}>
                <Typography.Title className="input-title">
                  Category
                </Typography.Title>
                <Form.Item
                  name="category"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select category"
                    onChange={handleChangeC}
                    style={{
                      width: "100%",
                    }}
                    options={categories.map((category) => ({
                      value: category._id,
                      label: category.name,
                    }))}
                  />
                </Form.Item>

                <Form.Item name="categoryC">
                  <Select
                    allowClear
                    size="large"
                    mode="multiple"
                    placeholder="Select category"
                    style={{
                      width: "100%",
                    }}
                    options={categoriesC.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Card>

              {/* Status */}
              <Card
                className="col-2-item"
                size="large"
                title={`Product Status`}
              >
                <Typography.Title className="input-title">
                  Status
                </Typography.Title>
                <Form.Item
                  name="status"
                  rules={[
                    { required: true, message: "Please select a status" },
                  ]}
                >
                  <Select
                    size="large"
                    placeholder="Select Status"
                    options={Object.keys(PRODUCT_STATUS).map((key) => ({
                      value: PRODUCT_STATUS[key],
                      label: PRODUCT_STATUS[key],
                    }))}
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

export default AddProduct;
