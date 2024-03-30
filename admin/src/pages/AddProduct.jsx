import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components/index.js";
import { redirect, useNavigation, useLoaderData } from "react-router-dom";
import { FaImage } from "react-icons/fa6";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";

{
  /* antd */
}
import {
  PlusOutlined,
  UploadOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Modal,
  Upload,
  Button,
  Checkbox,
  Select,
  Form,
  Input,
  Typography,
  InputNumber,
  Tooltip,
  Card,
  Breadcrumb,
  Space,
} from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
{
  /* antd */
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, personName, theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    await customFetch.post("/product", formData);
    return redirect("/add-product");
  } catch (error) {
    return error;
  }
};

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);

    const categoryChild = await customFetch
      .get("/category/get/child")
      .then(({ data }) => data);

    // let categoryChild = [];
    // if (categories.length > 0) {
    //   categoryChild = await Promise.all(
    //     categories.map(async (category) => {
    //       const children = await customFetch
    //         .get(`/category/get/child/${category._id}`)
    //         .then(({ data }) => data.categories);

    //       return children;
    //     })
    //   );
    // }
    return { categories, categoryChild };
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
  const { categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const theme = useTheme();

  /* antd */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

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
  /* antd */
  const onFinish = async (values) => {
    console.log("Success:", values);
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });
    console.log("formData:", formData);
    await customFetch.post("/product/create", formData);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const [categoryC, setCategoryC] = useState(categoryChild[0] || []);
  const [categoryP, setCategoryP] = useState();
  const [categoryC, setCategoryC] = useState([]);
  const [categoriesC, setCategoriesC] = useState([]);
  const filteredOptions = categoriesC.filter((o) => !categoryC.includes(o));

  const handleChangeC = (value) => {
    let newCategoriesC = [];
    categoryChild.map((item) => {
      if (item.parent.toString() === value.toString()) {
        newCategoriesC.push(item);
      }
    });
    setCategoriesC(newCategoriesC);
    setCategoryP(value);
  };
  const handleChangeC2 = (event) => {
    const {
      target: { value },
    } = event;
    setCategoriesC(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="">Product</a>,
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

        <Form
          name="basic"
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Product information */}
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
                      <Input size="large" placeholder="RTX 4090Ti" />
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
              {/* Variants */}
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
                          style={{
                            display: "grid",
                            gridTemplateColumns: "2.5fr 7fr 0.5fr",
                            width: "100%",
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            style={{ width: "100%" }}
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
              <Card className="col-2-item" size="large" title={`Price`}>
                <Typography.Title className="input-title">
                  Price
                </Typography.Title>
                <Form.Item name="price">
                  <InputNumber
                    suffix="VND"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="99999999"
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Sale Price
                </Typography.Title>
                <Form.Item name="salePrice">
                  <InputNumber
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="99999999"
                  />
                </Form.Item>
              </Card>

              <Card className="col-2-item" size="large" title={`Category`}>
                <Typography.Title className="input-title">
                  Brand
                </Typography.Title>
                <Form.Item name="brand">
                  <Select
                    size="large"
                    placeholder="Select Brand"
                    options={[
                      {
                        value: "Samsung",
                        label: "Samsung",
                      },
                      {
                        value: "Oppo",
                        label: "Oppo",
                      },
                      {
                        value: "Nokia",
                        label: "Nokia",
                      },
                    ]}
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Category
                </Typography.Title>
                <Form.Item name="category">
                  <Select
                    size="large"
                    placeholder="Inserted are removed"
                    value={categoryP}
                    onChange={(value) => handleChangeC(value)}
                    style={{
                      width: "100%",
                    }}
                    options={categories.map((category) => {
                      return {
                        value: category._id,
                        label: category.name,
                      };
                    })}
                  />
                </Form.Item>
                <Form.Item name="categoryC">
                  <Select
                    size="large"
                    mode="multiple"
                    placeholder="Inserted are removed"
                    value={categoryC}
                    style={{
                      width: "100%",
                    }}
                    options={filteredOptions.map((item) => ({
                      value: item._id,
                      label: item.name,
                    }))}
                  />
                </Form.Item>
              </Card>
            </div>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
          <div class="btn">
            {/* Xóa data đã nhập (cụ thể: Load lại trang add sp) */}
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
            {/* Submit data đã nhập vào dtb */}
            <Button
              size="large"
              type="primary"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want submit?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddProduct;
