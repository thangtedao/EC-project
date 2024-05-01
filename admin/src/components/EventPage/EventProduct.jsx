import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  Card,
} from "antd";
import Highlighter from "react-highlight-words";
import { PRODUCT_STATUS } from "../../utils/constants";

const Wrapper = styled.div`
  width: 100%;
  .col-1 {
    width: 100%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .table {
    width: 100%;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
  .ant-card-head-title {
    text-align: left;
  }
`;

const EventProduct = ({
  products,
  categories,
  selectedProductIds,
  setSelectedProductIds,
  setSelectedProducts,
}) => {
  const navigate = useNavigate();

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
      onClick: () => console.log("View"),
    },
  ];

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  //CheckBox
  const [selectionType] = useState("checkbox");

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

  //Danh sách các cột A
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

  const rowSelection = {
    selectedRowKeys: selectedProductIds,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProducts(selectedRows);
      setSelectedProductIds(selectedRowKeys);
    },
    //Ko thể chọn sp out of stock
    getCheckboxProps: (record) => ({
      disabled:
        record.status === "Out of stock" || record.status === "Discontinued",
      status: record.status,
    }),
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

  return (
    <Wrapper>
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
      </div>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
        <Card className="col-1-item" size="large" title={`Add Product`}>
          <Table
            className="table"
            rowSelection={{ type: "checkbox", ...rowSelection }}
            columns={columns}
            dataSource={products.map((product) => ({
              ...product,
              key: product._id,
            }))}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </Card>
      </div>
    </Wrapper>
  );
};

export default EventProduct;
