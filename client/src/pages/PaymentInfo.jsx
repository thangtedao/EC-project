import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCart } from "../components";
import { pink } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import customFetch from "../utils/customFetch";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  width: 650px;
  height: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .cart-header {
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: large;
    display: grid;
    grid-template-columns: auto 1fr;
    place-items: center;
    border-bottom: 1px solid lightgray;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .header-action {
    //padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .product-item-outer {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 0;
  }
  .product-item {
    position: relative;
    display: flex;
    //padding-left: 1rem;
  }
  .checkbox-btn {
    width: 30px;
    height: 30px;
  }
  .product-image {
    width: 20%;
    img {
      width: 100%;
    }
  }
  .product-info {
    width: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    color: #cf0000;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-count {
    color: black;
    display: flex;
    input {
      width: 30px;
      text-align: center;
      font-size: 14px;
      border: transparent;
      background-color: transparent;
    }
    .count-btn {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: lightgray;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
  .customer-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    p {
      text-transform: uppercase;
    }
  }
  .customer-info-input {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 2rem 2rem 2rem;
    gap: 1rem;
  }
`;

export const loader = async ({ params }) => {
  try {
    const cities = await axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then(({ data }) => data);
    return cities;
  } catch (error) {
    return error;
  }
};

const PaymentInfo = () => {
  const cart = useSelector((state) => state.cart.cart);
  const cities = useLoaderData();

  const [city, setCity] = useState(cities[0].code);
  const [allDistrict, setAllDistrict] = useState();
  const [district, setDistrict] = useState();

  const handleChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };

  const handleChange02 = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
  };

  useEffect(() => {
    (async () => {
      try {
        const districts = await axios.get(
          `https://provinces.open-api.vn/api/p/${city}?depth=2`
        );
        setAllDistrict(districts.districts);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [city]);

  useEffect(() => {
    (async () => {
      try {
        const ward = await axios.get(
          `https://provinces.open-api.vn/api/d/${district}?depth=2`
        );
        console.log(ward);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [district]);

  return (
    <Wrapper>
      <div className="cart-header">
        <ArrowBackIcon /> Thông tin
      </div>
      <div className="cart-container">
        {cart?.map((item, index) => {
          return <ProductCart key={index} product={item} />;
        })}
      </div>
      <div className="customer-info">
        <p>Thông tin khách hàng</p>
        <div className="customer-info-input">
          <TextField id="" label="Họ và tên" variant="standard" />
          <TextField id="" label="Số điện thoại" variant="standard" />
          <TextField id="" label="Email" variant="standard" />
        </div>
      </div>
      <div className="customer-info">
        <p>Thông tin khách hàng</p>
        <div className="customer-info-input">
          <TextField id="" label="Họ và tên" variant="standard" />
          <TextField id="" label="Số điện thoại" variant="standard" />
          <TextField id="" label="Email" variant="standard" />
        </div>
      </div>
      <div>
        <InputLabel id="demo-simple-select-label">Tỉnh/Thành phố</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cities[0].code}
          label="Tỉnh/Thành phố"
          onChange={handleChange}
        >
          {cities.map((city) => {
            return (
              <MenuItem key={city.code} value={city.code}>
                {city.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div>
        <InputLabel id="demo-simple-select-label">Quận/Huyện</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={allDistrict?.length > 0 ? allDistrict[0]?.code : 1}
          label="Quận/Huyện"
          onChange={handleChange02}
        >
          {allDistrict?.length > 0 &&
            allDistrict?.map((district) => {
              return (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              );
            })}
        </Select>
      </div>
    </Wrapper>
  );
};

export default PaymentInfo;
