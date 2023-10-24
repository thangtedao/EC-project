import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ProductSpecifications = () => {
  return (
    <div className="product-specifications-container">
      Thông số kỹ thuật
      <div className="product-specifications">
        <ul className="technical-content">
          <li className="technical-content-item">
            <p>Loại card đồ họa</p>
            <p>8 nhân GPU, 16 nhân Neural Engine</p>
          </li>
          <li className="technical-content-item">
            <p>Dung lượng RAM</p>
            <p>8GB</p>
          </li>
          <li className="technical-content-item">
            <p>Ổ cứng</p>
            <p>256GB</p>
          </li>
          <li className="technical-content-item">
            <p>Kích thước màn hình</p>
            <p>13.6 inches</p>
          </li>
          <li className="technical-content-item">
            <p>Công nghệ màn hình</p>
            <p>Liquid Retina Display</p>
          </li>
          <li className="technical-content-item">
            <p>Pin</p>
            <p>52,6 Wh</p>
          </li>
          <li className="technical-content-item">
            <p>Độ phân giải màn hình</p>
            <p>2560 x 1664 pixels</p>
          </li>
          <li className="technical-content-item">
            <p>Cổng giao tiếp</p>
            <p>2 x Thunderbolt 3 Jack tai nghe 3.5 mm MagSafe 3</p>
          </li>
        </ul>
      </div>
      <button className="button-show-model-technical">
        Xem cấu hình chi tiết
        <KeyboardArrowDownIcon />
      </button>
    </div>
  );
};

export default ProductSpecifications;
