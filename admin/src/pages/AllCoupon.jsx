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
    const coupons = await customFetch
      .get(`/coupon`)
      .then(({ data }) => data.coupons);
    return coupons;
  } catch (error) {
    return error;
  }
};

const AllCoupon = () => {
  const coupons = useLoaderData();
  const navigate = useNavigate();

  const deleteCoupon = async (id) => {
    await customFetch.delete(`/coupon/delete/${id}`);
    console.log("deleted");
    navigate("/all-coupon");
  };

  return (
    <Wrapper>
      {coupons.map((coupon) => {
        return (
          <div key={coupon._id}>
            {coupon.name} -{coupon.description} -{coupon.expiry} -
            {coupon.discount} -
            <button onClick={() => navigate(`/edit-coupon/${coupon._id}`)}>
              Edit
            </button>
            <button onClick={() => deleteCoupon(coupon._id)}>Delete</button>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default AllCoupon;
