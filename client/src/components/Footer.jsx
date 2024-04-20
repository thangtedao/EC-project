import React from "react";
import Wrapper from "../assets/wrappers/Footer.js";
import Facebook from "../assets/logo/facebook.svg";
import Zalo from "../assets/logo/zalo.svg";
import Youtube from "../assets/logo/youtube.svg";
import Stripe from "../assets/logo/stripe.svg";
import Paypal from "../assets/logo/paypal.svg";

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-container">
        <div className="footer-items">
          <div className="footer-items-title">Tổng đài hỗ trợ miễn phí</div>

          <div className="footer-items-content">Hotline: 100000001</div>

          <div className="footer-items-title">Phương thức thanh toán</div>

          <div className="footer-items-content">
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src={Stripe} alt="Stripe" width="80" height="40" />
            </a>
            <a href="" target="_blank" rel="noopener noreferrer">
              <img src={Paypal} alt="Paypal" width="80" height="40" />
            </a>
          </div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Thông tin và chính sách</div>

          <div className="footer-items-content">Chính sách mua hàng </div>

          <div className="footer-items-content">Chính sách ưu đãi </div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Dịch vụ và thông tin khác</div>

          <div className="footer-items-content">Tuyển dụng </div>
        </div>
        <div className="footer-items">
          <div className="footer-items-title">Kết nối với chúng tôi </div>

          <div className="footer-items-content">
            <a
              href="https://www.facebook.com/profile.php?id=100032919374509"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Facebook} alt="Facebook" />
            </a>
            <a
              href="https://res.cloudinary.com/dykffemq6/image/upload/v1701530255/Tlcn/dgtjoz61ul3mliirykqx.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Zalo} alt="Zalo" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCu13YswvXt4XxSCj2DL_54A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Youtube} alt="Youtube" />
            </a>
          </div>

          <div className="footer-items-content">
            Gmail: nguyenthanhvy789@gmail.com
          </div>

          <div className="footer-items-content">
            Gmail: thangtedao@gmail.com
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Footer;
