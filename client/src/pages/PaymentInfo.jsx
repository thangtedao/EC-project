import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCart } from "../components";
import TextField from "@mui/material/TextField";
import customFetch from "../utils/customFetch";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLoaderData, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 650px;
  height: 100%;
  padding-bottom: 1rem;
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

  .product-item-outer {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }
  .product-item {
    position: relative;
    display: flex;
    height: 100px;
  }
  .product-image {
    width: 20%;
    height: inherit;
    img {
      height: inherit;
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
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count {
      font-size: 1rem;
      font-weight: 500;
    }
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      font-size: 0.95rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
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
  .form-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    p {
      text-transform: uppercase;
    }
  }
  .form-info-input {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 1rem 1rem 1rem;
    gap: 1.5rem;
  }
  .form-address {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 1rem;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 1rem;
  }
  .bottom-bar {
    width: 100%;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    gap: 1rem;
    .btn {
      height: 2.5rem;
      border-radius: 5px;
      border: none;
      background: #d70018;
      font-size: medium;
      color: white;
      cursor: pointer;
    }
  }
  .price-temp {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

export const loader = async ({ params }) => {
  try {
    return null;
  } catch (error) {
    return error;
  }
};

const PaymentInfo = () => {
  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const totalPrice =
    cart?.reduce(
      (accumulator, item) => accumulator + item.salePrice * item.count,
      0
    ) || 0;

  useEffect(() => {
    if (cart.length <= 0) {
      navigate("/cart");
    }
  }, []);

  //const cities = useLoaderData();

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setCities(citiesResponse.data);
        setCity(citiesResponse.data[0]?.code || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const districtsResponse = await axios.get(
          `https://provinces.open-api.vn/api/p/${city}?depth=2`
        );
        const fetchedDistricts = districtsResponse.data.districts || [];
        setDistricts(fetchedDistricts);
        setDistrict(
          fetchedDistricts.length > 0 ? fetchedDistricts[0]?.code : ""
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchDistricts();
  }, [city]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const wardsResponse = await axios.get(
          `https://provinces.open-api.vn/api/d/${district}?depth=2`
        );
        const fetchedWards = wardsResponse.data.wards || [];
        setWards(fetchedWards);
        setWard(fetchedWards.length > 0 ? fetchedWards[0]?.code : "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchWards();
  }, [district]);

  const handleChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
  };

  const handleChange02 = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
  };

  const handleChange03 = (event) => {
    const selectedWard = event.target.value;
    setWard(selectedWard);
  };

  return (
    <Wrapper>
      <div className="cart-header">
        <a onClick={() => navigate("/cart")}>
          <ArrowBackIcon />
        </a>
        Thông tin
      </div>
      <div className="cart-container">
        {cart?.map((item, index) => {
          return <ProductCart key={index} product={item} isPayment />;
        })}
      </div>
      <div className="form-info">
        <p>Thông tin khách hàng</p>
        <div className="form-info-input">
          <div className="is-flex">
            <TextField
              id=""
              label="Họ và tên"
              defaultValue={user?.fullName || ""}
              variant="standard"
              sx={{ width: "50%" }}
            />
            <TextField
              id=""
              label="Số điện thoại"
              defaultValue={user?.phone || ""}
              variant="standard"
              sx={{ width: "50%" }}
            />
          </div>
          <TextField
            id=""
            label="Email"
            defaultValue={user?.email || ""}
            variant="standard"
          />
        </div>
      </div>

      <div className="form-info">
        <p>Thông tin nhận hàng</p>
        <div className="form-address">
          <FormControl variant="standard">
            <InputLabel id="city-select-label">Tỉnh/Thành phố</InputLabel>
            <Select
              labelId="city-select-label"
              id="city-select"
              value={city}
              label="Tỉnh/Thành phố"
              sx={{ width: "300px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "200px",
                  },
                },
              }}
              onChange={handleChange}
            >
              {cities.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
            <Select
              labelId="district-select-label"
              id="district-select"
              value={district}
              label="Quận/Huyện"
              sx={{ width: "300px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "200px",
                  },
                },
              }}
              onChange={handleChange02}
            >
              {districts.map((district) => (
                <MenuItem key={district.code} value={district.code}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
            <Select
              labelId="ward-select-label"
              id="ward-select"
              value={ward}
              label="Phường/Xã"
              sx={{ width: "300px" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "200px",
                  },
                },
              }}
              onChange={handleChange03}
            >
              {wards.map((ward) => (
                <MenuItem key={ward.code} value={ward.code}>
                  {ward.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField id="" label="Số nhà, tên đường" variant="standard" />
        </div>
      </div>
      <div className="bottom-bar">
        <div className="price-temp">
          <p>Tổng tiền tạm tính:</p>
          {totalPrice}₫
        </div>
        <button className="btn" onClick={() => navigate("/cart/payment")}>
          Tiếp tục
        </button>
      </div>
    </Wrapper>
  );
};

export default PaymentInfo;
