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
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
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
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .form-add {
    height: fit-content;
    width: 100%;
    display: flex;
    gap: 2rem;
    background-color: white;
    box-shadow: 0px 3px 14px rgba(226, 225, 225, 0.75);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1rem;
  }
  .form-col-1 {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .input-image {
    height: 300px;
    border: 1px solid black;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 1rem;
    .image {
      cursor: pointer;
      background-color: #ededed;
      border-radius: 5px;
      height: 300px;
      width: 320px;
      display: grid;
      place-items: center;
      overflow: hidden;
    }
    img {
      max-width: 320px;
      max-height: 300px;
    }
  }
  .sub-image {
    display: grid;
    row-gap: 10px;
    .image {
      cursor: pointer;
      background-color: #ededed;
      border-radius: 5px;
      height: 145px;
      width: 160px;
      display: grid;
      place-items: center;
      overflow: hidden;
    }
    img {
      width: inherit;
      max-height: 145px;
    }
  }

  .form-col-2 {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 40%;
  }
  .form-row {
    .form-label {
      font-size: 0.9rem;
      font-weight: bold;
      color: #00193b;
    }
    .form-input {
      border: 1px solid #e2e1e1;
      border-radius: 8px;
      padding: 0 20px;
      height: 44px;
    }
    .form-select {
      border: 1px solid #e2e1e1;
      border-radius: 8px;
      padding: 0 20px;
      height: 44px;
    }
    textarea {
      resize: none;
      width: 100%;
      height: 120px;
      overflow: auto;
      padding: 1rem;
      border-radius: 10px;
      border: 0.5px solid lightgray;
    }
  }
  .btn {
    height: 50px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
  }

  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 1rem;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 1rem;
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

  const handleCancel = () => setPreviewOpen(false);
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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Product</title>
        </Helmet>

        <div className="title">Add Product</div>
        <div>
          <div className="form-col-1">
            <div className="form-row">
              <label htmlFor="images" className="form-label">
                {"Image Link"}
              </label>
              <textarea name="images" />
            </div>
            <div className="form-row">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea name="description" />
            </div>
            <div className="form-row">
              <label htmlFor="specifications" className="form-label">
                Specifications
              </label>
              <textarea name="specifications" />
            </div>
          </div>
          <div className="form-col-2">
            <FormRow type="text" name="name" lableText="Product Name" />
            <FormRow type="number" name="price" lableText="Regular Price" />
            <FormRow type="number" name="salePrice" lableText="Sale Price" />
            <FormRow
              type="number"
              name="stockQuantity"
              lableText="Quantity in Stock"
            />
            <div className="form-row">
              <label htmlFor="status" className="form-label"></label>
              <select
                name="status"
                className="form-select"
                defaultValue={PRODUCT_STATUS.AVAILABLE}
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
              defaultValue={
                categories.length > 0
                  ? categories[0].name
                  : "Chưa có category nào"
              }
              onChange={(e) => {
                [
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
              defaultValue={
                categoryChild.length > 0 && categoryC.length > 0
                  ? categoryC[0].name
                  : ""
              }
            /> */}

            {/* <FormControl sx={{ mb: 3 }} size="small">
              <div className="form-label" style={{ fontWeight: "bold" }}>
                Category Child
              </div>
              <Select
                name="category2"
                sx={{ minHeight: 44, p: 0 }}
                multiple
                value={categoriesC}
                onChange={handleChangeC}
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
            </FormControl> */}

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

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
            <div className="col-1">
              {/* INFORMATION FIELDS */}
              <div className="col-1-item">
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

              {/* MEDIA FIELDS */}
              <div className="col-1-item">
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
            </div>

            <div className="col-2">
              <div className="col-2-item">
                <Typography.Title className="input-title">
                  Price
                </Typography.Title>
                <Form.Item name="price">
                  <InputNumber
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
              </div>

              <div className="col-2-item">
                <Typography.Title className="input-title">
                  Brand
                </Typography.Title>
                <Form.Item name="brand">
                  <Select
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
              </div>
            </div>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddProduct;
