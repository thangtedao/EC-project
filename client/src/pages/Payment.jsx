import { useState } from "react";
import Wrapper from "../assets/wrappers/Payment.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ListItem } from "../components";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { PayPalButton } from "../components";
import { VnPayButton } from "../components";
import Logo from "../assets/logo/NovaCoupon.svg";
import Avatar from "@mui/material/Avatar";
import {
  Checkbox,
  FormControlLabel,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";

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
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    let cartItem;
    if (user) {
      const cartData = await customFetch
        .get("/cart/get-cart")
        .then(({ data }) => data);
      cartItem = cartData.cartItem;
    }

    if (cartItem?.length <= 0) return redirect("/cart");

    const totalPrice =
      cartItem?.reduce(
        (acc, item) =>
          acc +
          ((item.variant ? item.variant.price : 0) + item.product.salePrice) *
            item.quantity,
        0
      ) || 0;

    return { cartItem, totalPrice, user };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Payment = () => {
  const { cartItem, totalPrice, user } = useLoaderData();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(totalPrice || 0);
  const [coupon, setCoupon] = useState(null);
  const [code, setCode] = useState();
  const [paypalButtonKey, setPaypalButtonKey] = useState(0);

  // Change address
  const [isCheck, setIsCheck] = useState(false);
  const changeAddress = (event) => {
    setIsCheck(event.target.checked);
  };

  // Apply coupon
  const applyCoupon = async (code) => {
    try {
      const couponData = await customFetch
        .post("/coupon/apply", { code })
        .then(({ data }) => data);

      if (couponData) {
        console.log(couponData);
        if (couponData.discountType === "percentage") {
          let discount = (totalPrice * couponData.discountValue) / 100;
          if (couponData.maxDiscount && discount > couponData.maxDiscount)
            discount = couponData.maxDiscount;
          const totalAfterDiscount = totalPrice - discount.toFixed(0);
          setTotalAmount(totalAfterDiscount);
        } else if (couponData.discountType === "fixed")
          setTotalAmount(totalPrice - couponData.discountValue);
        setCoupon(couponData);
      }
      setPaypalButtonKey((prevKey) => prevKey + 1);
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Payment</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="header">
          <a onClick={() => navigate("/cart")}>
            <ArrowBackIcon />
          </a>
          Thông tin thanh toán
        </div>

        <div className="list-item">
          {cartItem?.map((item, index) => {
            return <ListItem key={index} item={item} />;
          })}
        </div>

        <div className="form-info">
          <p>Thông tin khách hàng</p>
          <div className="form-info-input">
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <TextField
                required
                size="small"
                name="fullName"
                label="Full Name"
                defaultValue={user?.fullName}
                sx={{ width: "50%" }}
              />
              <TextField
                required
                size="small"
                name="phone"
                label="Phone Number"
                defaultValue={user?.phone}
                sx={{ width: "50%" }}
              />
            </div>
            <TextField
              required
              size="small"
              name="email"
              label="Email"
              defaultValue={user?.email}
            />
          </div>
        </div>

        <div className="form-info">
          <p>Địa chỉ giao hàng</p>

          <TextField
            size="small"
            InputProps={{
              readOnly: true,
            }}
            value={
              user?.address &&
              `${user?.address.city} ${user?.address.district} ${user?.address.ward} ${user?.address.home}`
            }
            sx={{ width: "100%", background: "white" }}
          />

          {/* <FormControlLabel
            control={
              <Checkbox
                checked={isCheck}
                onChange={changeAddress}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Change Address"
          />

          {isCheck && (
            <div className="form-address">
              <TextField
                required
                size="small"
                name="home"
                label="Home Number"
              />
            </div>
          )} */}
        </div>

        {/* COUPON FIELD */}
        <div style={{ marginTop: "1rem" }}>MÃ GIẢM GIÁ</div>
        <div className="coupon-field">
          <TextField
            size="small"
            label="Coupon"
            placeholder="Enter coupon"
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="btn-apply" onClick={() => applyCoupon(code)}>
            Áp dụng
          </button>
        </div>

        {coupon && (
          <div className="coupon-card">
            <Avatar
              alt="Remy Sharp"
              src={Logo}
              sx={{
                borderRadius: 0,
                width: "70px",
                height: "70px",
                marginRight: "5px",
              }}
            />
            <div className="coupon-info">
              <span style={{ fontWeight: 700 }}>{coupon.name}</span>
              <span>{coupon.code}</span>
              <span>
                Giảm{" "}
                {coupon.discountValue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                {coupon.discountType === "percentage" ? "%" : "vnd"}
              </span>
            </div>
          </div>
        )}

        <div className="price">
          <div className="price-item">
            <span>Tạm tính:</span>
            <span>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
            </span>
          </div>
          {coupon && (
            <div className="price-item">
              <span>Mã giảm:</span>
              <span>
                -
                {(totalPrice - totalAmount)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                ₫
              </span>
            </div>
          )}

          <div className="price-item">
            <span>Tổng tiền:</span>
            <span>
              {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}₫
            </span>
          </div>
        </div>

        <PayPalButton
          key={paypalButtonKey}
          cartItem={cartItem}
          coupon={coupon}
          totalAmount={totalAmount}
        />
        <VnPayButton
          totalPrice={totalAmount}
          cartItem={cartItem}
          coupon={coupon}
        />

        {/* <div className="form-info">
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
              `${user?.address.city} ${user?.address.district} ${user?.address.ward} ${user?.address.home}`
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
              <FormControl variant="standard">
                <InputLabel id="city-select-label">Tỉnh/Thành phố</InputLabel>
                <Select
                  required
                  labelId="city-select-label"
                  name="city"
                  value={city?.name || ""}
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
                    <MenuItem key={city.code} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                <Select
                  required
                  labelId="district-select-label"
                  name="district"
                  value={district?.name || ""}
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
                    <MenuItem key={district.code} value={district.name}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                <Select
                  required
                  name="ward"
                  labelId="ward-select-label"
                  value={ward?.name || ""}
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
                    <MenuItem key={ward.code} value={ward.name}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                required
                name="home"
                label="Số nhà, tên đường"
                variant="standard"
              />
            </div>
          )}
        </div> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Payment;
