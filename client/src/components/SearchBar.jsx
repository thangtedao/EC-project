import { InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Form, NavLink, useSubmit } from "react-router-dom";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { debounce } from "lodash";
import styled from "styled-components";

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
    height: 30px;
    min-width: 50px;
    .search-input {
      width: 80%;
    }
    .search-icon {
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
  .search-result {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: fit-content;
    max-height: 300px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
  }
  .product-card {
    display: flex;
    padding: 5px;
  }
  .product-card-info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 0.9rem;
      font-weight: bold;
      color: #444;
    }
  }
  .price {
    font-size: 0.9rem;
    color: #d70018;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    font-weight: bold;
    .strike {
      font-size: 0.9rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
`;

const SearchBar = () => {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);

  const fetchData = debounce(async (name) => {
    const response = await customFetch.get(`/product/search/?name=${name}`);
    setProducts(response.data.products || []);
  }, 1000);

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
        />
        <div className="search-icon">
          <Search />
        </div>
      </Form>
      <div className="search-result">
        <NavLink className="product-card">
          <div className="product-card-info">
            <div className="name">Iphone</div>
            <div className="price">
              9999<div className="strike">9999</div>
            </div>
          </div>
        </NavLink>
      </div>
    </Wrapper>
  );
};

export default SearchBar;
