import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Button, Input, Tag, Dropdown } from "antd";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .table {
    width: 100%;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get(`/category/all-categories`)
      .then(({ data }) => data);
    const categoriesC = await customFetch
      .get(`/category/get/child`)
      .then(({ data }) => data);
    const itemPerCate = await customFetch
      .get(`/category/get/item-amount`)
      .then(({ data }) => data);
    return { categories, categoriesC, itemPerCate };
  } catch (error) {
    return error;
  }
};

const AllCategory = () => {
  let { categories, categoriesC, itemPerCate } = useLoaderData();
  const navigate = useNavigate();

  categories = categories?.map((category) => {
    const newCategory = { ...category };
    newCategory.subCate = [];
    newCategory.itemPerCate = 0;
    delete newCategory.parent;
    return newCategory;
  });

  categories?.forEach((item) => {
    item.subCate = categoriesC
      ?.filter((itemC) => itemC.parent === item._id)
      .map(({ _id, name }) => ({ _id, name }));
    itemPerCate
      ?.filter((i) => item._id === i._id)
      .map(({ count }) => {
        item.itemPerCate = count;
      });
  });

  const handleAddCategoryClick = () => {
    navigate("/add-category");
  };
  const handleEditCategory = () => {
    navigate("/edit-category/:slug");
  };

  const deleteCategory = async (id) => {
    await customFetch.delete(`/category/delete/${id}`);
    console.log("deleted");
    navigate("/all-category");
  };
  //Search Product
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
    },
  ];

  // Color Tag
  const fixedColor = "geekblue";

  //Danh sách các cột
  const columns = [
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Sub Category",
      dataIndex: "subCate",
      key: "subCate",
      width: 200,
      render: (_, { subCate }) => (
        <>
          {subCate?.map((category) => {
            return (
              <Tag color={fixedColor} key={category?._id}>
                {category?.name.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "Item",
      dataIndex: "itemPerCate",
      key: "itemPerCate",
      width: 150,
    },
    {
      title: "Total Sold",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: () => (
        <Dropdown.Button
          onClick={handleEditCategory}
          menu={{
            items,
          }}
        >
          <EditOutlined />
          Edit
        </Dropdown.Button>
      ),
    },
  ];

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Category</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "Category",
            },
          ]}
        />
        <div className="title">Category</div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Search
            size="large"
            placeholder="Enter search name"
            allowClear
            onSearch={onSearch}
            style={{
              width: "30%",
              minWidth: 300,
            }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ width: 150 }}
            onClick={handleAddCategoryClick}
          >
            Add Category
          </Button>
        </div>
        <Table
          className="table"
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          columns={columns}
          dataSource={categories.map((category) => ({
            ...category,
            key: category._id,
          }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCategory;
