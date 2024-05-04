import React, { useState } from "react";
import "./TypeMessage.css";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
function TypeMessage(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!onSubmit || value === "") return;

    onSubmit(value);
    //set value after submit
    setValue("");
  };
  return (
    <form onSubmit={handleFormSubmit} className="ad-chatuser-typemessage">
      <input
        placeholder="Type a message"
        type="text"
        value={value}
        onChange={handleValueChange}
      />
      {/* <button type="submit">Gửi</button> */}
      <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
    </form>
  );
}

export default TypeMessage;
