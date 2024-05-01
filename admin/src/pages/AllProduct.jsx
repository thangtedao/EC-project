import React, { useRef, useState } from "react";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Wrapper from "../assets/wrapper/product/AllProduct.js";
import { useNavigate, useLoaderData } from "react-router-dom";
import { PRODUCT_STATUS } from "../utils/constants.js";
import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Table,
  Image,
  Button,
  Input,
  Dropdown,
  Tag,
  Space,
} from "antd";
import Highlighter from "react-highlight-words";

//Select row
// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  // Column configuration not to be checked
  getCheckboxProps: (record) => ({
    disabled: record.status === "Out of stock",
    status: record.status,
  }),
};

export const loader = async () => {
  try {
    const products = await customFetch
      .get(`/product/?populate=category`)
      .then(({ data }) => data);

    const categories = await customFetch
      .get("/category/all-categories")
      .then(({ data }) => data);

    const categoriesC = await customFetch
      .get(`/category/get/child`)
      .then(({ data }) => data);

    const stats = await customFetch
      .get(`/order/stats-product`)
      .then(({ data }) => data.products);

    return { products, categories, categoriesC, stats };
  } catch (error) {
    return error;
  }
};

const AllProduct = () => {
  let { products, categories, categoriesC, stats } = useLoaderData();
  const navigate = useNavigate();

  categories = categories?.map((category) => {
    category.key = category._id;
    if (!category.parent) {
      category.children = categoriesC
        ?.filter((itemC) => itemC.parent === category._id)
        .map((itemC) => {
          itemC.key = itemC._id;
          return itemC;
        });

      return category;
    }
    return null;
  });
  categories = categories?.filter((item) => item !== null);

  products.forEach((product) => {
    const foundItem = stats.find((item) => item._id === product._id);
    if (foundItem) {
      product.sold = foundItem.totalSold;
      product.revenue = foundItem.totalRevenue;
    } else {
      product.sold = 0;
      product.revenue = 0;
    }
  });

  const handleAddProduct = () => {
    navigate("/add-product");
  };
  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };
  const handleReloadClick = () => {
    navigate("/add-product");
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
      onClick: () => handleAddProduct(),
    },
  ];

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
      title: "Image",
      width: 100,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      render: (images) => <Image width={80} height={80} src={images[0]} />,
    },
    {
      title: "Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => {
        return category?.map((item) => <div key={item._id}>{item?.name}</div>);
      },
      filters: categories?.map((category) => {
        return {
          text: category?.name,
          value: category?._id,
          children: category?.children.map((item) => {
            return { text: item?.name, value: item?._id };
          }),
        };
      }),
      filterMode: "tree",
      onFilter: (value, record) =>
        record?.category?.some((cat) => cat?._id === value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      sorter: (a, b) => a.salePrice - b.salePrice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "";
        if (status === "Available") {
          color = "green";
        } else if (status === "Out of stock") {
          color = "orange";
        } else if (status === "Discontinued") {
          color = "red";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: Object.keys(PRODUCT_STATUS).map((key) => {
        return {
          text: PRODUCT_STATUS[key],
          value: PRODUCT_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 150,
      render: (revenue) =>
        revenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditProduct(_id)}
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

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };

  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 10,
  };

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //CheckBox
  const [selectionType] = useState("checkbox");

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Product</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: "Product",
            },
          ]}
        />

        <div className="title">Product</div>

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
            onClick={handleAddProduct}
          >
            Add Product
          </Button>
        </div>

        <Button
          size="large"
          style={{ marginBottom: 20, width: 100 }}
          onClick={handleReloadClick}
        >
          Reload
        </Button>

        <Table
          className="table"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={products.map((product) => ({
            ...product,
            key: product._id,
          }))}
          onChange={onChange}
          scroll={{ x: 1350 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllProduct;
