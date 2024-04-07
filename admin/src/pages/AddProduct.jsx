import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigation, useLoaderData } from "react-router-dom";

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
} from "antd";

export const loader = async () => {
  try {
    const brands = await customFetch
      .get("/brand/all-brands")
      .then(({ data }) => data);

    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);

    const categoryChild = await customFetch
      .get("/category/get/child")
      .then(({ data }) => data);

    return { brands, categories, categoryChild };
  } catch (error) {
    return error;
  }
};

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

const AddProduct = () => {
  const { brands, categories, categoryChild } = useLoaderData();

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
    console.log("Success:", values);
    const formData = new FormData();
    if (values.categoryC) {
      values.category = [values.category, ...values.categoryC];
      delete values.categoryC;
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
    await customFetch.post("/product/create", formData);
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
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-product">Product</a>,
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
                      <Input size="large" placeholder="Enter Product Name" />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Description
                    </Typography.Title>
                    <Form.Item name="description">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your description..."
                        autoSize={{
                          minRows: 3,
                          maxRows: 5,
                        }}
                      />
                    </Form.Item>

                    <Typography.Title className="input-title">
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

              {/* VARIATIONS FIELDS*/}
              <Card className="col-1-item" size="large" title={`Variants`}>
                <Typography.Title className="input-title">
                  Options
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
                            <Select
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
                            <Input size="large" placeholder="Enter Value" />
                          </Form.Item>
                          <Form.Item
                            name={[name, "priceModifier"]}
                            {...restField}
                            rules={[
                              {
                                required: true,
                                message: "Missing Value",
                              },
                            ]}
                          >
                            <InputNumber
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
                          Add another option
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
                  Brand
                </Typography.Title>
                <Form.Item name="brand">
                  <Select
                    size="large"
                    placeholder="Select Brand"
                    options={brands?.map((brand) => {
                      return {
                        value: brand._id,
                        label: brand.name,
                      };
                    })}
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Category
                </Typography.Title>
                <Form.Item name="category">
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
                <Form.Item name="status">
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
