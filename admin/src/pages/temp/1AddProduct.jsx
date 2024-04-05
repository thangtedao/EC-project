import React, { useState } from "react";
import { PRODUCT_STATUS } from "../utils/constants.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components/index.js";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import { FaImage } from "react-icons/fa6";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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
      .then(({ data }) => data.categories);

    let categoryChild = [];
    if (categories.length > 0) {
      categoryChild = await Promise.all(
        categories.map(async (category) => {
          const children = await customFetch
            .get(`/category/get/child/${category._id}`)
            .then(({ data }) => data.categories);

          return children;
        })
      );
    }
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
`;

const AddProduct = () => {
  const { categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const theme = useTheme();

  const [categoryC, setCategoryC] = useState(categoryChild[0] || []);
  const [categoriesC, setCategoriesC] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategoriesC(typeof value === "string" ? value.split(",") : value);
  };

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

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Product</title>
        </Helmet>

        <div className="title">Add Product</div>
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
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddProduct;
