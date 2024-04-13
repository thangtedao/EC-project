import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartItem } from "../components";
import TextField from "@mui/material/TextField";
// import axios from "axios";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
// import Select from "@mui/material/Select";
import { Form, redirect, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Checkbox, FormControlLabel } from "@mui/material";
import customFetch from "../utils/customFetch";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import NovaIcon from "../assets/LogoNova.svg";

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
    height: 80px;
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
    font-size: 0.9rem;
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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const isValidAddress = (field) => field && field.trim() !== "";

    if (
      isValidAddress(data.city) &&
      isValidAddress(data.district) &&
      isValidAddress(data.ward) &&
      isValidAddress(data.home)
    ) {
      await customFetch.patch("/user/update-user", formData);
      const user = (await customFetch.get("/user/current-user")).data.user;
      store.dispatch(login({ user }));
      return redirect("/cart/payment");
    }

    if (
      !isValidAddress(data.cityC) ||
      !isValidAddress(data.districtC) ||
      !isValidAddress(data.wardC) ||
      !isValidAddress(data.homeC)
    ) {
      return toast.warning("Thông tin không hợp lệ");
    }

    return redirect("/cart/payment");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loader = async () => {
  try {
    window.scrollTo(0, 0);
    let { user } = JSON.parse(localStorage.getItem("persist:user"));
    let { cart } = JSON.parse(localStorage.getItem("persist:cart"));
    if (cart === "[]") return redirect("/cart");
    if (user === "null") return redirect("/login");
    return null;
  } catch (error) {
    return error;
  }
};

const PaymentInfo = () => {
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

  const [isCheck, setIsCheck] = useState(false);

  const changeAddress = (event) => {
    setIsCheck(event.target.checked);
  };

  //const cities = useLoaderData();

  // const [cities, setCities] = useState([]);
  // const [city, setCity] = useState("");
  // const [districts, setDistricts] = useState([]);
  // const [district, setDistrict] = useState("");
  // const [wards, setWards] = useState([]);
  // const [ward, setWard] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const citiesResponse = await axios.get(
  //         "https://partner.viettelpost.vn/v2/categories/listProvinceById?provinceId=-1"
  //       );
  //       const provinceNames = citiesResponse.data.map(province => province.PROVINCE_NAME);
  //       setCities(provinceNames);
  //       console.log(provinceNames)
  //       setCity(provinceNames[0] || "");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchDistricts = async () => {
  //     try {
  //       const districtsResponse = await axios.get(
  //         `https://partner.viettelpost.vn/v2/categories/listProvinceById?provinceId=-1`
  //       );
  //       const fetchedDistricts = districtsResponse.data.districts || [];
  //       setDistricts(fetchedDistricts);
  //       setDistrict(fetchedDistricts.length > 0 ? fetchedDistricts[0] : "");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchDistricts();
  // }, [city]);

  // useEffect(() => {
  //   const fetchWards = async () => {
  //     try {
  //       const wardsResponse = await axios.get(
  //         `https://partner.viettelpost.vn/v2/categories/listProvinceById?provinceId=-1`
  //       );
  //       const fetchedWards = wardsResponse.data.wards || [];
  //       setWards(fetchedWards);
  //       setWard(fetchedWards.length > 0 ? fetchedWards[0] : "");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchWards();
  // }, [district]);

  // const handleChange = (event) => {
  //   const selectedCityName = event.target.value;
  //   const selectedCity =
  //     cities.find((city) => city.name === selectedCityName) || {};
  //   setCity(selectedCity);
  // };

  // const handleChange02 = (event) => {
  //   const selectedDistrictName = event.target.value;
  //   const selectedDistrict =
  //     districts.find((district) => district.name === selectedDistrictName) ||
  //     {};
  //   setDistrict(selectedDistrict);
  // };

  // const handleChange03 = (event) => {
  //   const selectedWardName = event.target.value;
  //   const selectedWard =
  //     wards.find((ward) => ward.name === selectedWardName) || {};
  //   setWard(selectedWard);
  // };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Payment Info</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="cart-header">
          <a onClick={() => navigate("/cart")}>
            <ArrowBackIcon />
          </a>
          Thông tin
        </div>
        <div className="cart-container">
          {cart?.map((item, index) => {
            return <CartItem key={index} product={item} isPayment />;
          })}
        </div>

        <Form
          method="post"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div className="form-info">
            <p>Thông tin khách hàng</p>
            <div className="form-info-input">
              <div className="is-flex">
                <TextField
                  required
                  name="fullName"
                  label="Họ và tên"
                  defaultValue={user?.fullName || ""}
                  variant="standard"
                  sx={{ width: "50%" }}
                />
                <TextField
                  required
                  name="phone"
                  label="Số điện thoại"
                  defaultValue={user?.phone || ""}
                  variant="standard"
                  sx={{ width: "50%" }}
                />
              </div>
              <TextField
                required
                name="email"
                label="Email"
                defaultValue={user?.email || ""}
                variant="standard"
              />
            </div>
          </div>

          <div className="form-info">
            <p>Thông tin nhận hàng</p>
            <input name="cityC" defaultValue={user?.address.city} hidden />
            <input
              name="districtC"
              defaultValue={user?.address.district}
              hidden
            />
            <input name="wardC" defaultValue={user?.address.ward} hidden />
            <input name="homeC" defaultValue={user?.address.home} hidden />

            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={
                user?.address &&
                `${user?.address.city}, ${user?.address.district}, ${user?.address.ward}, ${user?.address.home}`
              }
              variant="standard"
              sx={{ width: "100%" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCheck}
                  onChange={changeAddress}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Thay đổi địa chỉ"
            />

            {isCheck && (
              <div className="form-address">
                <TextField
                  required
                  name="city"
                  label="Tỉnh/Thành phố"
                  variant="standard"
                />
                <TextField
                  required
                  name="district"
                  label="Quận/Huyện"
                  variant="standard"
                />
                <TextField
                  required
                  name="ward"
                  label="Phường/Xã"
                  variant="standard"
                />
                <TextField
                  required
                  name="home"
                  label="Số nhà, tên đường"
                  variant="standard"
                />
              </div>
            )}
          </div>
          <div className="bottom-bar">
            <div className="price-temp">
              <p>Tổng tiền tạm tính:</p>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
            </div>
            <button type="submit" className="btn">
              Tiếp tục
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default PaymentInfo;
