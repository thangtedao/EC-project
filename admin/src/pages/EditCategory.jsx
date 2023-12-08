import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .form-add {
    height: fit-content;
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    box-shadow: 0px 3px 14px rgba(226, 225, 225, 0.75);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1rem;
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
    height: 40px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
  }
`;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  if (data.parent === "") delete data.parent;
  try {
    await customFetch.patch(`/category/update/${data.id}`, data);
    return redirect("/all-category");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return redirect("/all-category");
    }
    const category = await customFetch
      .get(`/category/${slug}`)
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

        <div className="title">Edit Category</div>
        <Form method="post" className="form-add">
          <input name="id" hidden defaultValue={category?._id} />
          <FormRow type="text" name="name" defaultValue={category?.name} />
          <FormRow type="text" name="slug" defaultValue={category?.slug} />
          <div className="form-row">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea name="description" defaultValue={category?.description} />
          </div>
          <FormRowSelect name="parent" list={categories || []} id optional />
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditCategory;
