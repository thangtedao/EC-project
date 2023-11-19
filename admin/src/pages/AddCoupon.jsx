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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/coupon", data);
    return redirect("/all-coupon");
  } catch (error) {
    return error;
  }
};

const Wrapper = styled.div``;

const AddCoupon = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Coupon</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Add Coupon</h4>
          <FormRow type="text" name="name" defaultValue="SALE" />
          <FormRow type="text" name="description" defaultValue="giam gia 99%" />
          <FormRow
            type="date"
            name="expiry"
            defaultValue={new Date().toDateString()}
          />
          <FormRow type="number" name="discount" defaultValue={99} />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddCoupon;
