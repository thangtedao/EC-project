import { useEffect, useState } from "react";
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
import axios from "axios";

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

  /* Address */
  const [isCheck, setIsCheck] = useState(false);

  const changeAddress = (event) => {
    setIsCheck(event.target.checked);
  };

  const [address, setAddress] = useState({
    city: user?.address.city,
    district: user?.address.district,
    ward: user?.address.ward,
    home: user?.address.home,
  });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(null);
  const [home, setHome] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citiesResponse = await axios.get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              "Content-Type": "application/json",
              Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
            },
          }
        );
        setCities(citiesResponse.data.data);
        setCity(citiesResponse.data.data[0] || {});
      } catch (error) {
        console.error(error);
      }
    };

    isCheck && fetchData();
  }, [isCheck]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        if (city) {
          const districtsResponse = await axios.get(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${city.ProvinceID}`,
            {
              headers: {
                "Content-Type": "application/json",
                Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
              },
            }
          );
          const fetchedDistricts = districtsResponse.data.data || [];
          setDistricts(fetchedDistricts);
          setDistrict(fetchedDistricts.length > 0 ? fetchedDistricts[0] : {});
        }
      } catch (error) {
        console.error(error);
      }
    };

    isCheck && fetchDistricts();
  }, [city]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        if (city && district) {
          const wardsResponse = await axios.get(
            `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${district.DistrictID}`,
            {
              headers: {
                "Content-Type": "application/json",
                Token: "b1e1bbcb-ef7f-11eb-9388-d6e0030cbbb7",
              },
            }
          );
          const fetchedWards = wardsResponse.data.data || [];
          setWards(fetchedWards);
          setWard(fetchedWards.length > 0 ? fetchedWards[0] : {});
        }
      } catch (error) {
        console.error(error);
      }
    };

    isCheck && fetchWards();
  }, [district]);

  const handleChange = (event) => {
    const selectedCityName = event.target.value;
    const selectedCity =
      cities.find((city) => city.ProvinceName === selectedCityName) || {};
    setCity(selectedCity);
  };

  const handleChange02 = (event) => {
    const selectedDistrictName = event.target.value;
    const selectedDistrict =
      districts.find(
        (district) => district.DistrictName === selectedDistrictName
      ) || {};
    setDistrict(selectedDistrict);
  };

  const handleChange03 = (event) => {
    const selectedWardName = event.target.value;
    const selectedWard =
      wards.find((ward) => ward.WardName === selectedWardName) || {};
    setWard(selectedWard);
  };

  const handleUpdateAddress = (event) => {
    if (city && district && ward && home) {
      setAddress({
        city: city.ProvinceName,
        district: district.DistrictName,
        ward: ward.WardName,
        home: home,
      });
      setIsCheck(false);
    } else {
      toast.warning("Địa chỉ không hợp lện");
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
              address &&
              `${address.home} ${address.ward} ${address.district} ${address.city}`
            }
            sx={{ width: "100%", background: "white" }}
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
            <div>
              <div className="form-info-select">
                <FormControl variant="standard">
                  <InputLabel id="city-select-label">Tỉnh/Thành phố</InputLabel>
                  <Select
                    labelId="city-select-label"
                    name="city"
                    value={city?.ProvinceName || ""}
                    // value={user?.address.city || ""}
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
                      <MenuItem key={city.ProvinceID} value={city.ProvinceName}>
                        {city.ProvinceName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                  <Select
                    labelId="district-select-label"
                    name="district"
                    value={district?.DistrictName || ""}
                    // value={user?.address.district || ""}
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
                      <MenuItem
                        key={district.DistrictID}
                        value={district.DistrictName}
                      >
                        {district.DistrictName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                  <Select
                    labelId="ward-select-label"
                    name="ward"
                    value={ward?.WardName || ""}
                    // defaultValue={user?.address.ward || ""}
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
                      <MenuItem key={ward.WardCode} value={ward.WardName}>
                        {ward.WardName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  required
                  name="home"
                  label="Số nhà, tên đường"
                  variant="standard"
                  sx={{ width: "300px" }}
                  onChange={(e) => {
                    setHome(e.target.value);
                  }}
                />
              </div>
              <button className="btn" onClick={handleUpdateAddress}>
                Cập nhật
              </button>
            </div>
          )}
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
          address={address}
        />
        <VnPayButton
          totalPrice={totalAmount}
          cartItem={cartItem}
          coupon={coupon}
          address={address}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default Payment;
