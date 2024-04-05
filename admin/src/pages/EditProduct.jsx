import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
import { redirect, useNavigation, useLoaderData } from "react-router-dom";
import { FaImage } from "react-icons/fa6";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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
    // fontWeight:
    //   personName.indexOf(name) === -1
    //     ? theme.typography.fontWeightRegular
    //     : theme.typography.fontWeightMedium,
  };
};

export const action = async ({ request, params }) => {
  const { slug } = params;
  try {
    const formData = await request.formData();
    await customFetch.patch(`/product/update/${slug}`, formData);
    return redirect("/all-product");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return redirect("/all-product");
    }
    const product = await customFetch
      .get(`/product/${slug}`)
      .then(({ data }) => data.product);

    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);

    const categoryChild = await Promise.all(
      categories.map(async (category) => {
        const children = await customFetch
          .get(`/category/get/child/${category._id}`)
          .then(({ data }) => data.categories);

        return children;
      })
    );
    return { product, categories, categoryChild };
  } catch (error) {
    return error;
  }
};

// const Wrapper = styled.div`
//   width: 100%;

//   .title {
//     font-size: 2rem;
//     font-weight: bold;
//     color: #00193b;
//     margin-bottom: 1rem;
//   }
//   .form-add {
//     height: fit-content;
//     width: 100%;
//     display: flex;
//     gap: 2rem;
//     background-color: white;
//     box-shadow: 0px 3px 14px rgba(226, 225, 225, 0.75);
//     border-color: #f1f1f1;
//     border-radius: 10px;
//     padding: 1rem;
//   }
//   .form-col-1 {
//     width: 60%;
//     display: flex;
//     flex-direction: column;
//     gap: 0.3rem;
//   }
//   .input-image {
//     height: 300px;
//     display: flex;
//     justify-content: space-between;
//     gap: 0.5rem;
//     margin-bottom: 1rem;
//     .image {
//       cursor: pointer;
//       background-color: #ededed;
//       border-radius: 5px;
//       height: 300px;
//       width: 320px;
//       display: grid;
//       place-items: center;
//       overflow: hidden;
//     }
//     img {
//       max-width: 320px;
//       max-height: 300px;
//     }
//   }
//   .sub-image {
//     display: grid;
//     row-gap: 10px;
//     .image {
//       cursor: pointer;
//       background-color: #ededed;
//       border-radius: 5px;
//       height: 145px;
//       width: 160px;
//       display: grid;
//       place-items: center;
//       overflow: hidden;
//     }
//     img {
//       width: inherit;
//       max-height: 145px;
//     }
//   }

//   .form-col-2 {
//     display: flex;
//     flex-direction: column;
//     gap: 0.3rem;
//     width: 40%;
//   }
//   .form-row {
//     .form-label {
//       font-size: 0.9rem;
//       font-weight: bold;
//       color: #00193b;
//     }
//     .form-input {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//     .form-select {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//     textarea {
//       resize: none;
//       width: 100%;
//       height: 120px;
//       overflow: auto;
//       padding: 1rem;
//       border-radius: 10px;
//       border: 0.5px solid lightgray;
//     }
//   }
//   .btn {
//     height: 50px;
//     border-radius: 10px;
//     background-color: #035ecf;
//     color: white;
//     font-size: 1.2rem;
//     font-weight: bolder;
//   }
// `;
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
const EditProduct = () => {
  const { product, categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const theme = useTheme();
  const isSubmitting = navigation.state === "submitting";

  // const [categoryP, setCategoryP] = useState(product.category[0]);
  // const [categoryC, setCategoryC] = useState(
  //   categoryChild[
  //     categories.findIndex((item) => item.slug === product.category[0])
  //   ]
  // );
  // const [categoriesC, setCategoriesC] = useState(
  //   product.category.slice(1) || []
  // );

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setCategoriesC(typeof value === "string" ? value.split(",") : value);
  // };

  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [selectedImage4, setSelectedImage4] = useState(null);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    switch (key) {
      case 1:
        setSelectedImage1(URL.createObjectURL(file));
        break;
      case 2:
        setSelectedImage2(URL.createObjectURL(file));
        break;
      case 3:
        setSelectedImage3(URL.createObjectURL(file));
        break;
      case 4:
        setSelectedImage4(URL.createObjectURL(file));
        break;

      default:
        break;
    }
  };

  const openFileInput = (key) => {
    switch (key) {
      case 1:
        document.getElementById("fileInput1").click();
        break;
      case 2:
        document.getElementById("fileInput2").click();
        break;
      case 3:
        document.getElementById("fileInput3").click();
        break;
      case 4:
        document.getElementById("fileInput4").click();
        break;
      default:
        break;
    }
  };
  //New
  //New
  //New
  //New
  //New
  {
    /* SUBMIT FORM */
  }
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
  //New
  //New
  //New
  //New

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
              title: "Edit Product",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Product</title>
        </Helmet>

        <div className="title">Edit Product</div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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

            {/* PRICE FIELD */}
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
                    // options={brands?.map((brand) => {
                    //   return {
                    //     value: brand._id,
                    //     label: brand.name,
                    //   };
                    // })}
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Category
                </Typography.Title>
                <Form.Item name="category">
                  <Select
                    size="large"
                    placeholder="Select category"
                    // value={categoryP}
                    onChange={(value) => handleChangeC(value)}
                    style={{
                      width: "100%",
                    }}
                    // options={categories.map((category) => {
                    //   return {
                    //     value: category._id,
                    //     label: category.name,
                    //   };
                    // })}
                  />
                </Form.Item>
                <Form.Item name="categoryC">
                  <Select
                    size="large"
                    mode="multiple"
                    placeholder="Select category"
                    // value={categoryC}
                    style={{
                      width: "100%",
                    }}
                    // options={filteredOptions.map((item) => ({
                    //   value: item._id,
                    //   label: item.name,
                    // }))}
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
                    // options={brands?.map((brand) => {
                    //   return {
                    //     value: brand._id,
                    //     label: brand.name,
                    //   };
                    // })}
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

            <Button
              size="large"
              type="primary"
              htmlType="submit"
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

        {/* <div>
        <Form method="post" className="form-add" encType="multipart/form-data">
          <div className="form-col-1">
            <div className="input-image">
              <div className="image" onClick={() => openFileInput(1)}>
                {selectedImage1 ? (
                  <img src={selectedImage1} alt="Image" />
                ) : (
                  <div>
                    <FaImage /> Browse Image
                  </div>
                )}
                <input
                  accept="image/*"
                  type="file"
                  id="fileInput1"
                  name="image1"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, 1)}
                />
              </div>
              <div className="image" onClick={() => openFileInput(2)}>
                {selectedImage2 ? (
                  <img src={selectedImage2} alt="Image" />
                ) : (
                  <div>
                    <FaImage /> Browse Image
                  </div>
                )}
                <input
                  accept="image/*"
                  type="file"
                  id="fileInput2"
                  name="image2"
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e, 2)}
                />
              </div>
              <div className="sub-image">
                <div className="image" onClick={() => openFileInput(3)}>
                  {selectedImage3 ? (
                    <img src={selectedImage3} alt="Image" />
                  ) : (
                    <div>
                      <FaImage /> Browse Image
                    </div>
                  )}
                  <input
                    accept="image/*"
                    type="file"
                    id="fileInput3"
                    name="image3"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, 3)}
                  />
                </div>
                <div className="image" onClick={() => openFileInput(4)}>
                  {selectedImage4 ? (
                    <img src={selectedImage4} alt="Image" />
                  ) : (
                    <div>
                      <FaImage /> Browse Image
                    </div>
                  )}
                  <input
                    accept="image/*"
                    type="file"
                    id="fileInput4"
                    name="image4"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, 4)}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="images" className="form-label">
                {"Image Link"}
              </label>
              <textarea name="images" defaultValue={product?.images || ""} />
            </div>
            <div className="form-row">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={product?.description || ""}
              />
            </div>
            <div className="form-row">
              <label htmlFor="specifications" className="form-label">
                Specifications
              </label>
              <textarea
                name="specifications"
                defaultValue={product?.specifications || ""}
              />
            </div>
          </div>
          <div className="form-col-2">
            <FormRow
              type="text"
              name="name"
              lableText="Product Name"
              defaultValue={product?.name || ""}
            />
            <FormRow
              type="number"
              name="price"
              lableText="Regular Price"
              defaultValue={product?.price || 1000}
            />
            <FormRow
              type="number"
              name="salePrice"
              lableText="Sale Price"
              defaultValue={product?.salePrice || 1000}
            />
            <FormRow
              type="number"
              name="stockQuantity"
              lableText="Quantity in Stock"
              defaultValue={product?.stockQuantity || 0}
            />
            <div className="form-row">
              <label htmlFor="status" className="form-label"></label>
              <select
                name="status"
                className="form-select"
                defaultValue={product?.status || ""}
              >
                {Object.values(PRODUCT_STATUS).map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <FormRowSelect
              name="category1"
              labelText="Main Category"
              list={categories || []}
              defaultValue={categoryP}
              onChange={(e) => {
                [
                  setCategoryP(e.target.value),
                  setCategoryC(
                    categoryChild.length > 0
                      ? categoryChild[e.target.selectedIndex]
                      : []
                  ),
                  setCategoriesC([]),
                ];
              }}
            />
            {/* <FormRowSelect
              name="category2"
              list={categoryC || []}
              defaultValue={categoryC.length > 0 && categoryC[0].name}
            /> *

            <FormControl sx={{ mb: 3 }} size="small">
              <div className="form-label" style={{ fontWeight: "bold" }}>
                Category Child
              </div>
              <Select
                name="category2"
                sx={{ minHeight: 44, p: 0 }}
                multiple
                value={categoriesC}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categoryC.map((item) => (
                  <MenuItem
                    key={item._id}
                    value={item.slug || ""}
                    style={getStyles(item.name, categoriesC, theme)}
                  >
                    {item.name || ""}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Editing..." : "Edit"}
            </button>
          </div>
        </Form>
      </div> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditProduct;
