import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
// import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import {
  Modal,
  Button,
  Select,
  Form,
  Input,
  Typography,
  Card,
  Breadcrumb,
} from "antd";

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   .title {
//     font-size: 2rem;
//     font-weight: bold;
//     color: #00193b;
//     margin-bottom: 1rem;
//   }
//   .form-add {
//     height: fit-content;
//     width: 600px;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     background-color: white;
//     box-shadow: 0px 3px 14px rgba(226, 225, 225, 0.75);
//     border-color: #f1f1f1;
//     border-radius: 10px;
//     padding: 1rem;
//   }

//   .form-row {
//     .form-label {
//       font-size: 0.9rem;
//       font-weight: bold;
//       color: #00193b;
//     }
//     .form-input {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//     .form-select {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//     textarea {
//       resize: none;
//       width: 100%;
//       height: 120px;
//       overflow: auto;
//       padding: 1rem;
//       border-radius: 10px;
//       border: 0.5px solid lightgray;
//     }
//   }
//   .btn {
//     height: 40px;
//     border-radius: 10px;
//     background-color: #035ecf;
//     color: white;
//     font-size: 1.2rem;
//     font-weight: bolder;
//   }
// `;
const Wrapper = styled.div`
  width: 100%;
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #f3f3f3;
    padding: 1 rem;
    height: 60px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      .get(`/category/${slug}/?populate=parent`)
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
  // const { category, categories } = useLoaderData();
  // const navigation = useNavigation();
  // const isSubmitting = navigation.state === "submitting";

  // const [categoryP, setCategoryP] = useState(category?.parent?._id || "");

  //NEW
  //NEW

  //Modal
  const [open, setModalOpen] = useState(false);
  //Mở Modal (Confirm box)
  const showModal = () => {
    setModalOpen(true);
  };
  //Đóng Modal sau khi xác nhận
  const handleOk = () => {
    setModalOpen(false);
  };
  //Đóng Modal sau khi xác nhận
  //Đóng ReviewOpen sau khi xác nhận
  const handleCancel = () => {
    setModalOpen(false);
  };
  //NEW
  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-category">Category</a>,
            },
            {
              title: "Edit Category",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Category</title>
        </Helmet>

        <div className="title">Edit Category</div>

        <Form
          name="basic"
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Category information`}
              >
                <div>
                  {/* INFORMATION FIELDS */}
                  <div>
                    <Typography.Title className="input-title">
                      Name
                    </Typography.Title>
                    <Form.Item name="name">
                      <Input size="large" placeholder="Enter Category Name" />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Category Slug
                    </Typography.Title>
                    <Form.Item name="slug">
                      <Input size="large" placeholder="Enter Category Slug" />
                    </Form.Item>

                    <Typography.Title className="input-title">
                      Description
                    </Typography.Title>
                    <Form.Item name="description">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your description..."
                        autoSize={{
                          minRows: 7,
                          maxRows: 9,
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </div>
            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Parent */}
              <Card className="col-2-item" size="large" title={`Parent`}>
                <Typography.Title className="input-title">
                  Category parent
                </Typography.Title>
                <Form.Item name="parent">
                  <Select
                    size="large"
                    placeholder="Select Parent"
                    // options={?.map(() => {
                    //   return {
                    //     value:,
                    //     label:,
                    //   };
                    // })}
                  />
                </Form.Item>
              </Card>
            </div>
          </div>
          {/* BUTTON SUBMIT */}
          <div className="btn">
            <Button
              danger
              size="large"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want to cancel?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Cancel
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want submit?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Submit
            </Button>
          </div>
        </Form>

        {/* <Form method="post" className="form-add">
          <input name="id" hidden defaultValue={category?._id} />
          <FormRow type="text" name="name" defaultValue={category?.name} />
          <FormRow type="text" name="slug" defaultValue={category?.slug} />
          <div className="form-row">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea name="description" defaultValue={category?.description} />
          </div>
          <FormRowSelect
            name="parent"
            defaultValue={categoryP}
            onChange={(e) => setCategoryP[e.target.value]}
            list={categories || []}
            id
            optional
          />
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditCategory;
