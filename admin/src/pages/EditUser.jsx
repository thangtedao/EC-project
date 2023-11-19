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
    await customFetch.patch(`/user/update-user/${id}`, data);
    return redirect("/all-user");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-user");
    }
    const user = await customFetch
      .get(`/user/single-user/${id}`)
      .then(({ data }) => data.user);

    return user;
  } catch (error) {
    return error;
  }
};

const EditUser = () => {
  const user = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit User</title>
        </Helmet>

        <Form method="post" className="form-login">
          <h4>Edit user</h4>
          <FormRow type="text" name="fullName" defaultValue={user?.fullName} />
          <FormRow type="email" name="email" defaultValue={user?.email} />
          <FormRow type="text" name="phone" defaultValue={user?.phone} />
          <FormRow type="text" name="address" defaultValue={user?.address} />
          <FormRow type="text" name="gender" defaultValue={user?.gender} />
          <FormRow type="text" name="role" defaultValue={user?.role} />
          <FormRow
            type="text"
            name="isBlocked"
            defaultValue={user?.isBlocked}
          />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditUser;
