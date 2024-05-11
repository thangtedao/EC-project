import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Profile.js";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import NovaIcon from "../assets/logo/LogoNova.svg";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import axios from "axios";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    await customFetch.patch("/user/update-user", formData);

    // const token = await customFetch
    //   .post("/auth/login", data)
    //   .then(({ data }) => data.token);

    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    if (user) {
      store.dispatch(
        login({
          user: {
            fullName: user.fullName,
            avatar: user.avatar,
            _id: user._id,
            role: user.role,
          },
        })
      );
    }

    toast.success("Update Successful");
    return null;
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

export const loader = async () => {
  try {
    window.scrollTo(0, 0);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);
    return { user };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Profile = () => {
  const { user } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();

  const [isCheck, setIsCheck] = useState(false);

  const changeAddress = (event) => {
    setIsCheck(event.target.checked);
  };

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(null);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(null);

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
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <h3>Thông tin cá nhân</h3>
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
              size="small"
              name="fullName"
              label="Họ và tên"
              defaultValue={user?.fullName}
              sx={{ width: "75%" }}
            />
            <TextField
              size="small"
              name="phone"
              type="number"
              label="Số điện thoại"
              defaultValue={user?.phone}
              sx={{ width: "75%" }}
            />
            <TextField
              size="small"
              // name="email"
              type="email"
              label="Email"
              defaultValue={user?.email}
              sx={{ width: "75%" }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              size="small"
              label="Rank"
              defaultValue={user?.rank?.toUpperCase()}
              sx={{ width: "75%" }}
              InputProps={{
                readOnly: true,
              }}
            />

            <div className="address-title">Address</div>
            <TextField
              size="small"
              InputProps={{
                readOnly: true,
              }}
              value={
                user?.address &&
                `${user?.address.city}, ${user?.address.district}, ${user?.address.ward}, ${user?.address.home}`
              }
              sx={{ width: "75%" }}
            />
            <FormControlLabel
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
                />
              </div>
            )}

            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Profile;
