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
  if (data.parent === "") delete data.parent;
  try {
    await customFetch.post("/category", data);
    return redirect("/add-category");
  } catch (error) {
    return error;
  }
};

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);
    return { categories };
  } catch (error) {
    return error;
  }
};

const Wrapper = styled.div``;

const AddCategory = () => {
  const { categories } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Category</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Add Category</h4>
          <FormRow type="text" name="name" defaultValue="Laptop" />
          <FormRow
            type="text"
            name="description"
            defaultValue="chung ta khong thuoc ve nhau"
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

export default AddCategory;
