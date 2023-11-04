import React from "react";
import styled from "styled-components";
import MenuBottom from "./MenuBottom";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  border-top: 1px solid lightgray;
  padding-top: 1rem;
  .footer-container {
    width: 1100px;
    height: 300px;
    //border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .footer-items {
    //border: 1px solid green;
    display: flex;
    flex-direction: column;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <MenuBottom />
      <div className="footer-container">
        <div className="footer-items">
          <div className="footer-items-title">Tổng đài hỗ trợ miễn phí</div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Thông tin và chính sách</div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Dịch vụ và thông tin khác</div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Kết nối với Thanh Vy</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
