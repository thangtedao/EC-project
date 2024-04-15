import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Form, NavLink } from "react-router-dom";
import { useState } from "react";
import customFetch from "../../utils/customFetch";
import { debounce } from "lodash";
import styled from "styled-components";
import img from "../../assets/react.svg";

const Wrapper = styled.div`
  position: relative;
  width: 30%;
  height: fit-content;

  .search-bar {
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 100%;
    height: 35px;
    min-width: 50px;
    .search-input {
      width: 80%;
    }
    .search-icon {
      display: grid;
      place-items: center;
    }
  }
  .search-result {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: fit-content;
    max-height: 500px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 10px 0;
    overflow: auto;
  }
  .product-card {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 50px;
    padding: 5px;
  }
  .product-card-image {
    height: 45px;
    display: grid;
    place-items: center;
    img {
      border-radius: 10px;
      height: inherit;
    }
  }
  .product-card-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .name {
      font-size: 0.9rem;
      font-weight: bold;
      color: #444;
    }
  }
  .price {
    color: #d70018;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: bold;
    .strike {
      font-size: 0.75rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
`;

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const fetchData = debounce(async (name) => {
    if (name !== "") {
      const response = await customFetch.get(`/product/search/?name=${name}`);
      setProducts(response.data.products || []);
    } else {
      setProducts([]);
    }
  }, 200);

  const handleSearch = (e) => {
    setInput(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <Wrapper>
      <Form className="search-bar">
        <InputBase
          className="search-input"
          placeholder="Tìm kiếm"
          value={input}
          name="name"
          onChange={(e) => handleSearch(e)}
          onFocus={() => setTimeout(() => setIsShow(true), 100)}
          onBlur={() => setTimeout(() => setIsShow(false), 100)}
        />
        <div className="search-icon">
          <Search />
        </div>
      </Form>
      {products.length > 0 && isShow && (
        <div className="search-result">
          {products?.map((product) => {
            return (
              <NavLink
                key={product._id}
                to={`/product/${product.slug}`}
                className="product-card"
              >
                <div className="product-card-image">
                  <img src={product?.images[0] || img} />
                </div>
                <div className="product-card-info">
                  <div className="name">{product?.name}</div>
                  <div className="price">
                    {product?.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                    <div className="strike">
                      {product?.salePrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                    </div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default SearchBar;
