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

const Wrapper = styled.div``;

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.parent === "") delete data.parent;
  try {
    await customFetch.patch(`/category/update/${id}`, data);
    return redirect("/all-category");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-category");
    }
    const category = await customFetch
      .get(`/category/${id}`)
      .then(({ data }) => data.category);
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);
    return { category, categories };
  } catch (error) {
    return error;
  }
};

const EditCategory = () => {
  const { category, categories } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Category</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Edit Category</h4>
          <FormRow type="text" name="name" defaultValue={category?.name} />
          <FormRow
            type="text"
            name="description"
            defaultValue={category?.description}
          />
          <FormRowSelect name="parent" list={categories || []} id optional />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditCategory;
