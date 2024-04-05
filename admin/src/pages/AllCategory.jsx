import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";

// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
    // const response = await customFetch.get(`/category/?populate=parent`);
    return {
      // categories: response.data.categories,
      // count: response.data.itemsPerCate,
    };
  } catch (error) {
    return error;
  }
};

const AllCategory = () => {
  const { categories, count } = useLoaderData();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);

  const handleClickOpen = (category) => {
    setOpen(true);
    setCategory(category);
  };

  const handleClose = () => {
    setOpen(false);
    setCategory(null);
  };
  const handleAddCategoryClick = () => {
    navigate("/add-category");
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
    // {
    //   title: "Image",
    //   width: 120,
    //   dataIndex: "images",
    //   key: "images",
    //   fixed: "left",
    //   render: (images) => <Image width={100} height={100} src={images[0]} />,
    // },
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Sub Category",
      dataIndex: "category",
      key: "category",
      width: 200,
      render: (_, { category }) => (
        <>
          {category.map((category) => {
            return (
              <Tag color={fixedColor} key={category}>
                {category.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      //   render: (category) => {
      //     return category?.map((item) => <div key={item._id}>{item?.name}</div>);
      //   },
      //   filters: categories?.map((category) => {
      //     return {
      //       text: category?.name,
      //       value: category?._id,
      //     };
      //   }),
      //   onFilter: (value, record) =>
      //     record?.category?.some((cat) => cat?._id === value),
    },

    {
      title: "Item",
      dataIndex: "Item",
      key: "Item",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      //   filters: Object.keys(PRODUCT_STATUS).map((key) => {
      //     return {
      //       text: PRODUCT_STATUS[key],
      //       value: PRODUCT_STATUS[key],
      //     };
      //   }),
      //   onFilter: (value, record) => record?.status === value,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: () => (
        <Dropdown.Button
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
          // dataSource={products.map((product) => ({
          //   ...product,
          //   key: product._id,
          // }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />

        {/* <div
          style={{
            width: "80%",
            display: "flex",
            padding: "2rem 1rem",
            flexDirection: "column",
            gap: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        > */}
        {/* {categories.map((parentCategory) => {
            return (
              !parentCategory.parent && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    paddingBottom: "0.3rem",
                    borderBottom: "1px solid lightgray",
                  }}
                  key={parentCategory._id}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 3fr 1fr 1fr",
                      columnGap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {"+ " + parentCategory.name}
                    </div>
                    <div style={{ marginLeft: "1.6rem" }}>
                      {parentCategory.description.length > 50
                        ? parentCategory.description.slice(0, 50) + "..."
                        : parentCategory.description}
                    </div>
                    <div style={{ marginLeft: "0.65rem" }}>
                      {count.map((item) => {
                        return (
                          parentCategory?.slug?.toString() ===
                            item?._id?.toString() && item.count
                        );
                      })}
                    </div>
                    <div style={{ marginLeft: "0.4rem" }}>
                      <button
                        className="ed-btn"
                        onClick={() =>
                          navigate(`/edit-category/${parentCategory.slug}`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                  {categories.map((childCategory) => {
                    if (
                      childCategory.parent &&
                      childCategory.parent.slug === parentCategory.slug
                    ) {
                      return (
                        <div
                          style={{
                            marginLeft: "2rem",
                            display: "grid",
                            gridTemplateColumns: "1fr 3fr 1fr 1fr",
                            columnGap: "1rem",
                            alignItems: "center",
                          }}
                          key={childCategory._id}
                        >
                          <div>{childCategory.name}</div>
                          <div>
                            {childCategory.description.length > 50
                              ? childCategory.description.slice(0, 50) + "..."
                              : childCategory.description}
                          </div>
                          <div>
                            {count.map((item) => {
                              return (
                                childCategory?.slug?.toString() ===
                                  item?._id?.toString() && item.count
                              );
                            })}
                          </div>
                          <div>
                            <button
                              className="ed-btn"
                              onClick={() =>
                                navigate(`/edit-category/${childCategory.slug}`)
                              }
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              )
            );
          })}
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Chắc là xóa chưa?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose}>Không xóa</Button>
            <Button onClick={() => deleteCategory(category._id)} autoFocus>
              Ừ xóa
            </Button>
          </DialogActions>
        </Dialog> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCategory;
