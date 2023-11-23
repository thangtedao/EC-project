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
    return redirect("/");
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

const Wrapper = styled.div``;

const AddProduct = () => {
  const { categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [categoryC, setCategoryC] = useState(categoryChild[0]);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Product</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Add Product</h4>
          <FormRow
            type="text"
            name="name"
            defaultValue="Macbook Pro Ultra Pro"
          />
          <FormRow
            type="text"
            name="description"
            defaultValue="chung ta khong thuoc ve nhau"
          />
          <FormRow type="text" name="price" defaultValue="100000" />
          <FormRow type="text" name="salePrice" defaultValue="50000" />
          <FormRow type="text" name="stockQuantity" defaultValue="99" />
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
          <div>
            <label htmlFor="images">image</label>
            <textarea
              type="text"
              name="images"
              defaultValue="https://ae01.alicdn.com/kf/S63491542aed64655bfc0165f22beefe9w.jpg_640x640Q90.jpg_.webp"
            />
          </div>
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddProduct;
