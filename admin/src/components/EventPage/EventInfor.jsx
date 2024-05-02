import React, { useState } from "react";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";

import {
  Card,
  Typography,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Modal,
  Form,
} from "antd";

const Wrapper = styled.div`
  width: 100%;

  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
    text-align: left;
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
  .ant-upload-list {
    /* Đặt phần tử .ant-upload-list bên trái */
    float: left;
  }
  .ant-card-head-title {
    text-align: left;
  }
  .form-item {
    margin-bottom: 24px;
  }
`;

//Rangepicker
const { RangePicker } = DatePicker;

const EventInfor = ({
  name,
  setName,
  setDescription,
  description,
  discount,
  setDiscount,
  dates,
  handleDateRangeChange,
}) => {
  // UPload IMG

  /* Upload Image and Preview */
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  //Đóng ReviewOpen sau khi xác nhận
  const handleCancel = () => {
    setPreviewOpen(false);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <Wrapper>
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
        <div
          className="col-1"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Card className="col-1-item" size="large" title={`Event information`}>
            <div>
              <Typography.Title className="input-title">Name</Typography.Title>
              <Input
                className="form-item"
                required
                value={name}
                size="large"
                placeholder="Name"
                onChange={(event) => setName(event.target.value)}
              />

              <Typography.Title className="input-title">
                Description
              </Typography.Title>
              <Input.TextArea
                className="form-item"
                size="large"
                placeholder="Description"
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </Card>
          <Card className="col-1-item" size="large" title={`Event Image`}>
            <div>
              <Typography.Title className="input-title">
                Image link
              </Typography.Title>
              <Input.TextArea
                className="form-item"
                size="large"
                placeholder="Enter link image"
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />
              <Upload
                className="form-item"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false}
                maxCount={5}
                multiple
              >
                {fileList.length >= 5 ? null : uploadButton}
              </Upload>

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="image"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </Card>
        </div>
        <div
          className="col-2"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Card className="col-2-item" size="large" title={`Day`}>
            <Typography.Title className="input-title">
              RangePicker
            </Typography.Title>
            <RangePicker
              className="form-item"
              required
              showTime
              style={{ width: "100%" }}
              value={dates}
              size="large"
              onChange={handleDateRangeChange}
            />
          </Card>
          <Card className="col-2-item" size="large" title={`Discount`}>
            <Typography.Title className="input-title">
              Percentage
            </Typography.Title>
            <InputNumber
              className="form-item"
              required
              value={discount}
              onChange={(value) => setDiscount(value)}
              suffix="%"
              style={{ width: "100%" }}
              size="large"
              placeholder="eg. 10%"
            />
          </Card>
        </div>
      </div>
    </Wrapper>
  );
};

export default EventInfor;
