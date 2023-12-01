import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.images = data.images.split(",");
  data.category = [data.category1, data.category2];
  delete data.category1;
  delete data.category2;
  try {
    await customFetch.post("/product", data);
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

    const categoryChild = await Promise.all(
      categories.map(async (category) => {
        const children = await customFetch
          .get(`/category/get/child/${category._id}`)
          .then(({ data }) => data.categories);

        return children;
      })
    );
    return { categories, categoryChild };
  } catch (error) {
    return error;
  }
};

const Wrapper = styled.div`
  width: 100%;

  .form-add {
    height: 700px;
    width: 100%;
    display: flex;
    gap: 2rem;
    background-color: lightblue;
  }
  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
  }
  .form-col-1 {
    width: 60%;
  }
  .input-image {
    position: relative;
    overflow: hidden;
    display: inline-block;
    input[type="file"] {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      padding: 0;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
    }

    .custom-input {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      cursor: pointer;
    }

    .image-preview {
      margin-top: 10px;
      max-width: 100%;
      max-height: 300px;
      overflow: hidden;
    }
  }

  .form-col-2 {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    width: 40%;
  }
  .form-row {
    height: 50px;
    .form-label {
      font-size: 12px;
      font-weight: bold;
      color: #8d8d99;
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
  }
`;

const AddProduct = () => {
  const { categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [categoryC, setCategoryC] = useState(categoryChild[0]);

  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Product</title>
        </Helmet>

        <div className="title">Add Product</div>
        <Form method="post" className="form-add">
          <div className="form-col-1">
            <div>
              <div className="input-image">
                <input
                  accept="image/*"
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="custom-input" onClick={openFileInput}>
                  Chọn ảnh
                </div>
                {imagePreview && (
                  <div className="image-preview">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="images">image</label>
              <textarea
                type="text"
                name="images"
                defaultValue="https://media.very.co.uk/i/very/VPZ33_SQ1_0000000020_BLUE_SLf?$300x400_retinamobilex2$&$roundel_very$&p1_img=blank_apple"
              />
            </div>
            <FormRow
              type="text"
              name="description"
              defaultValue="chung ta khong thuoc ve nhau"
            />
          </div>
          <div className="form-col-2">
            <FormRow
              type="text"
              name="name"
              lableText="Product Name"
              defaultValue="Iphone "
            />
            <FormRow
              type="text"
              name="price"
              lableText="Regular Price"
              defaultValue="100000"
            />
            <FormRow
              type="text"
              name="salePrice"
              lableText="Sale Price"
              defaultValue="50000"
            />
            <FormRow
              type="text"
              name="stockQuantity"
              lableText="Quantity in Stock"
              defaultValue="99"
            />
            <FormRowSelect
              name="category1"
              list={categories || []}
              defaultValue={categories[0].name || "Non"}
              onChange={(e) => {
                setCategoryC(categoryChild[e.target.selectedIndex]);
              }}
            />
            <FormRowSelect
              name="category2"
              list={categoryC || []}
              defaultValue={categoryC.length > 0 && categoryC[0].name}
            />
            <button type="submit" className="btn-block" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddProduct;
