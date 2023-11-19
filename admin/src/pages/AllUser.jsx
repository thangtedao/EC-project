import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect, ProductCard } from "../components/index.js";
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
    const users = await customFetch
      .get(`/user/all-users`)
      .then(({ data }) => data.users);
    return users;
  } catch (error) {
    return error;
  }
};

const AllUser = () => {
  const users = useLoaderData();
  const navigate = useNavigate();

  const deleteUser = async (id) => {
    await customFetch.delete(`/user/delete/${id}`);
    console.log("deleted");
    navigate("/all-user");
  };

  return (
    <Wrapper>
      {users?.map((user) => {
        return (
          <div key={user._id}>
            <div>
              {user.fullName}
              {user.email}
              {user.phone}
              {user.address}
              {user.gender}
              {user.birthday}
              {user.role}
              <img src={user.avatar} alt="avatar" />
              {user.isBlocked}
              {user.createdAt}
            </div>
            <button onClick={() => navigate(`/edit-user/${user._id}`)}>
              Edit
            </button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default AllUser;
