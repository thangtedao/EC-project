import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  .product-specifications-container {
    border: 0.5px solid lightgrey;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .technical-content {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .technical-content-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    padding: 0.8rem 0.5rem;
  }
  .gray-background {
    background-color: #f2f2f2;
  }
  .button-show-model-technical {
    border-radius: 10px;
    border: 0.5px solid lightgrey;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    cursor: pointer;
    :hover {
      border-color: red;
      color: red;
      background: #ffebeb;
    }
  }
`;

const ProductSpecifications = ({ product }) => {
  const productSpecifications = product?.specifications?.split("\r\n");

  return (
    <Wrapper>
      <div className="product-specifications-container">
        Thông số kỹ thuật
        <ul className="technical-content">
          {productSpecifications?.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  index % 2 !== 0
                    ? "technical-content-item"
                    : "technical-content-item gray-background"
                }
              >
                <p>{item.split("=")[0]}</p>
                <p>{item.split("=")[1]}</p>
              </li>
            );
          })}
        </ul>
        {/* <button className="button-show-model-technical">
          Xem cấu hình chi tiết
          <KeyboardArrowDownIcon />
        </button> */}
      </div>
    </Wrapper>
  );
};

export default ProductSpecifications;
