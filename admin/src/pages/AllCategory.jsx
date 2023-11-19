import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect, ProductCard } from "../components";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
  @media (max-width: 1550px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get(`/category`)
      .then(({ data }) => data.categories);
    return categories;
  } catch (error) {
    return error;
  }
};

const AllCategory = () => {
  const categories = useLoaderData();
  const navigate = useNavigate();

  const deleteCategory = async (id) => {
    await customFetch.delete(`/category/delete/${id}`);
    console.log("deleted");
    navigate("/all-category");
  };

  return (
    <Wrapper>
      {categories.map((category) => {
        return (
          <div key={category._id}>
            {category.name} - parent: {category.parent}
            <button onClick={() => navigate(`/edit-category/${category._id}`)}>
              Edit
            </button>
            <button onClick={() => deleteCategory(category._id)}>Delete</button>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default AllCategory;
