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

export const action = async ({ request, params }) => {
  const { slug } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  data.images = data.images.split(",");
  data.category = [data.category1, data.category2];
  delete data.category1;
  delete data.category2;
  try {
    await customFetch.patch(`/product/update/${slug}`, data);
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

const Wrapper = styled.div``;

const EditProduct = () => {
  const { product, categories, categoryChild } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [categoryC, setCategoryC] = useState(categoryChild[0]);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Product</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Edit Product</h4>
          <FormRow type="text" name="name" defaultValue={product?.name} />
          <FormRow
            type="text"
            name="description"
            defaultValue={product?.description}
          />
          <FormRow type="text" name="price" defaultValue={product.price} />
          <FormRow
            type="text"
            name="salePrice"
            defaultValue={product.salePrice}
          />
          <FormRow
            type="text"
            name="stockQuantity"
            defaultValue={product?.stockQuantity}
          />
          <FormRowSelect
            name="category1"
            list={categories || []}
            defaultValue={product.category[0]}
            onChange={(e) => {
              setCategoryC(categoryChild[e.target.selectedIndex]);
            }}
          />
          <FormRowSelect
            name="category2"
            list={categoryC || []}
            defaultValue={product.category[1]}
          />
          <div>
            <label htmlFor="images">image</label>
            <textarea type="text" name="images" required />
          </div>
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditProduct;
