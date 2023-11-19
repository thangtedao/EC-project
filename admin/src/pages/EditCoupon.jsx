import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components/index.js";
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
  try {
    await customFetch.patch(`/coupon/update/${id}`, data);
    return redirect("/all-coupon");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-coupon");
    }
    const coupon = await customFetch
      .get(`/coupon/${id}`)
      .then(({ data }) => data.coupon);

    return coupon;
  } catch (error) {
    return error;
  }
};

const EditCoupon = () => {
  const coupon = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Coupon</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Edit Coupon</h4>
          <FormRow type="text" name="name" defaultValue={coupon?.name} />
          <FormRow
            type="text"
            name="description"
            defaultValue={coupon?.description}
          />
          <FormRow type="date" name="expiry" defaultValue={coupon.expiry} />
          <FormRow
            type="number"
            name="discount"
            defaultValue={coupon.discount}
          />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditCoupon;
