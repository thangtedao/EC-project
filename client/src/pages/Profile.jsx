import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import customFetch from "../utils/customFetch";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Wrapper = styled.div`
  width: 1100px;
  text-align: center;
  padding: 1rem 0;

  h5 {
    font-weight: bold;
  }

  .form-info {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    text-align: left;
  }
  .form-image {
    display: grid;
    place-items: center;
    height: 300px;
    width: 35%;
    .avatar {
      height: 250px;
      width: 250px;
      border-radius: 50%;
      border: 1px solid black;
      margin-bottom: 20px;
      overflow: hidden;
      position: relative;
    }
    img {
      max-width: 400px;
      max-height: 400px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    input {
      width: 50%;
    }
  }

  .address-title {
    margin-top: 1.1rem;
    text-align: left;
  }

  .form-info-input {
    width: 65%;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    gap: 1rem;
    margin: 1rem 0;
  }
  .form-info-select {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .btn {
    margin-top: 1rem;
    max-width: 150px;
    height: 2rem;
  }
`;

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    await customFetch.patch("/user/update-user", formData);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);
    store.dispatch(login({ user: user }));
    toast.success("Update successful");
    return null;
  } catch (error) {
    return error;
  }
};

export const loader = async () => {
  try {
    return null;
  } catch (error) {
    return error;
  }
};

const Profile = () => {
  window.scrollTo(0, 0);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

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
        setCity(citiesResponse.data[0] || "");
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
          `https://provinces.open-api.vn/api/p/${city && city?.code}?depth=2`
        );
        const fetchedDistricts = districtsResponse.data.districts || [];
        setDistricts(fetchedDistricts);
        setDistrict(fetchedDistricts.length > 0 ? fetchedDistricts[0] : "");
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
          `https://provinces.open-api.vn/api/d/${
            district && district?.code
          }?depth=2`
        );
        const fetchedWards = wardsResponse.data.wards || [];
        setWards(fetchedWards);
        setWard(fetchedWards.length > 0 ? fetchedWards[0] : "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchWards();
  }, [district]);

  const handleChange = (event) => {
    const selectedCityName = event.target.value;
    const selectedCity =
      cities.find((city) => city.name === selectedCityName) || {};
    setCity(selectedCity);
  };

  const handleChange02 = (event) => {
    const selectedDistrictName = event.target.value;
    const selectedDistrict =
      districts.find((district) => district.name === selectedDistrictName) ||
      {};
    setDistrict(selectedDistrict);
  };

  const handleChange03 = (event) => {
    const selectedWardName = event.target.value;
    const selectedWard =
      wards.find((ward) => ward.name === selectedWardName) || {};
    setWard(selectedWard);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Profile</title>
        </Helmet>

        <h5>Thông tin khách hàng</h5>
        <Form method="post" className="form-info" encType="multipart/form-data">
          <div className="form-image">
            <div className="avatar">
              <img src={selectedImage ? selectedImage : user?.avatar} />
            </div>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <div className="form-info-input">
            <TextField
              name="fullName"
              label="Họ và tên"
              defaultValue={user?.fullName || ""}
              variant="standard"
              sx={{ width: "75%" }}
            />
            <TextField
              name="phone"
              type="number"
              label="Số điện thoại"
              defaultValue={user?.phone || ""}
              variant="standard"
              sx={{ width: "75%" }}
            />
            <TextField
              name="email"
              type="email"
              label="Email"
              defaultValue={user?.email || ""}
              variant="standard"
              sx={{ width: "75%" }}
              InputProps={{
                readOnly: true,
              }}
            />

            <div className="address-title">Địa chỉ</div>
            <div className="form-info-select">
              <FormControl variant="standard">
                <InputLabel id="city-select-label">Tỉnh/Thành phố</InputLabel>
                <Select
                  labelId="city-select-label"
                  name="city"
                  value={city?.name || ""}
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
                    <MenuItem key={city.code} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel id="district-select-label">Quận/Huyện</InputLabel>
                <Select
                  labelId="district-select-label"
                  name="district"
                  value={district?.name || ""}
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
                    <MenuItem key={district.code} value={district.name}>
                      {district.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl variant="standard">
                <InputLabel id="ward-select-label">Phường/Xã</InputLabel>
                <Select
                  labelId="ward-select-label"
                  name="ward"
                  value={ward?.name || ""}
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
                    <MenuItem key={ward.code} value={ward.name}>
                      {ward.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                name="home"
                label="Số nhà, tên đường"
                variant="standard"
                sx={{ width: "300px" }}
              />
            </div>
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Profile;
