import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import { FaImage } from "react-icons/fa6";

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

const Wrapper = styled.div`
  width: 100%;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .form-add {
    height: 700px;
    width: 100%;
    display: flex;
    gap: 2rem;
    background-color: #00193b;
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
      background-color: #e2e1e1;
      border-radius: 5px;
      height: 300px;
      width: 320px;
      display: grid;
      place-items: center;
      overflow: hidden;
    }
    img {
      width: inherit;
      max-height: 300px;
    }
  }
  .sub-image {
    display: grid;
    row-gap: 10px;
    .image {
      cursor: pointer;
      background-color: #e2e1e1;
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

const EditProduct = () => {
  const { product, categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [categoryC, setCategoryC] = useState(categoryChild[0]);

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
          <title>Edit Product</title>
        </Helmet>

        <div className="title">Edit Product</div>
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
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Editing..." : "Edit"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditProduct;
