import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

import {
  Form,
  Card,
  Typography,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Modal,
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
`;

//Rangepicker
const { RangePicker } = DatePicker;

const EventInfor = () => {
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
    <HelmetProvider>
      <Wrapper>
        <Form name="basic">
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Event information`}
              >
                <div>
                  <Typography.Title className="input-title">
                    Name
                  </Typography.Title>
                  <Form.Item name="name">
                    <Input
                      size="large"
                      placeholder="Hè hè hè laptop rẻ vãi chè"
                    />
                  </Form.Item>

                  <Typography.Title className="input-title">
                    Description
                  </Typography.Title>
                  <Form.Item name="description">
                    <Input.TextArea
                      size="large"
                      placeholder="Tết đến xuân về xuân lại đi. Hè tới giá giảm nhìn cực phê!!!"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>
                </div>
              </Card>
              <Card className="col-1-item" size="large" title={`Event Image`}>
                <div>
                  <Typography.Title className="input-title">
                    Image link
                  </Typography.Title>
                  <Form.Item name="merelink">
                    <Input.TextArea
                      size="large"
                      placeholder="Enter link image"
                      autoSize={{
                        minRows: 3,
                        maxRows: 5,
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="images" label="Images">
                    <Upload
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
                  </Form.Item>

                  <Form.Item>
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
                  </Form.Item>
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
                <Form.Item name="startDate">
                  <RangePicker showTime size="large" />
                </Form.Item>
              </Card>
              <Card className="col-2-item" size="large" title={`Discount`}>
                <Typography.Title className="input-title">
                  Percentage
                </Typography.Title>
                <Form.Item name="price">
                  <InputNumber
                    suffix="%"
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="eg. 10%"
                  />
                </Form.Item>
              </Card>
            </div>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EventInfor;
