import React, { useRef, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/category/AllCategory.js";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Button, Input, Dropdown, Tag, Space } from "antd";
import Highlighter from "react-highlight-words";

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

  categoriesC = categoriesC.map((category) => {
    category.key = category._id;
    itemPerCate
      ?.filter((i) => category._id === i._id)
      .map(({ count }) => {
        category.itemPerCate = count;
      });
    return category;
  });

  categories = categories?.map((category) => {
    category.key = category._id;
    itemPerCate
      ?.filter((i) => category._id === i._id)
      .map(({ count }) => {
        category.itemPerCate = count;
      });

    if (!category.parent) {
      category.children = categoriesC
        ?.filter((itemC) => itemC.parent === category._id)
        .map((itemC) => itemC);

      return category;
    }
    return null;
  });

  categories = categories?.filter((item) => item !== null);

  const handleAddCategoryClick = () => {
    navigate("/add-category");
  };
  const handleEditCategory = (id) => {
    navigate(`/edit-category/${id}`);
  };
  const handleViewCategory = (id) => {
    navigate(`/detail-category/${id}`);
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
      icon: <EyeOutlined />,
      onClick: (_id) => handleViewCategory(_id),
    },
  ];

  // Color Tag
  const fixedColor = "geekblue";

  // Search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  //Danh sách các cột
  const columns = [
    {
      title: "Name",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Sub Category",
      dataIndex: "children",
      key: "children",
      width: 200,
      render: (_, { children }) => (
        <>
          {children?.map((category) => {
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
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditCategory(_id)}
          menu={{
            items: items.map((item) => ({
              ...item,
              onClick: () => item.onClick(_id),
            })),
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
    // console.log("params", pagination, filters, sorter, extra);
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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
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
          columns={columns}
          dataSource={categories}
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
