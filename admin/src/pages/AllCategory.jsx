import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  table {
    background-color: white;
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse;
  }
  th {
    /* border: 1px solid lightgray; */
    height: 20px;
  }
  tr {
    border: 1px solid lightgray;
  }
  td {
    /* border: 1px solid lightgray; */
    height: 30px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 20px;
  }

  th:last-child,
  td:last-child,
  th:nth-last-child(2),
  td:nth-last-child(2) {
    width: 50px;
  }

  th:not(:last-child):not(:nth-last-child(2)),
  td:not(:last-child):not(:nth-last-child(2)) {
    width: 180px;
  }

  button {
    min-width: 80px;
    font-weight: bolder;
    border-radius: 23px;
    background: white;
    height: 30px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .ed-btn {
    border: 2px solid #035ecf;
    color: #035ecf;
    :hover {
      background-color: #035ecf;
      color: white;
    }
  }
  .dl-btn {
    border: 2px solid #ff5470;
    color: #ff5470;
    :hover {
      background-color: #ff5470;
      color: white;
    }
  }
  @media (max-width: 1550px) {
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get(`/category/?populate=parent`);

    console.log(response.data);

    return {
      categories: response.data.categories,
      count: response.data.itemsPerCate,
    };
  } catch (error) {
    return error;
  }
};

const AllCategory = () => {
  const { categories, count } = useLoaderData();
  const navigate = useNavigate();

  const deleteCategory = async (id) => {
    await customFetch.delete(`/category/delete/${id}`);
    console.log("deleted");
    navigate("/all-category");
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Category</title>
        </Helmet>

        <div className="title">All Category</div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Items</th>
              <th>Parent</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              return (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.description}</td>
                  <td>{category.parent?.name}</td>
                  <td>
                    <button
                      className="ed-btn"
                      onClick={() => navigate(`/edit-category/${category._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="dl-btn"
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCategory;
