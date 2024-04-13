import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import customFetch from "../utils/customFetch";
// import axios from "axios";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { Form, useNavigate, useNavigation } from "react-router-dom";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NovaIcon from "../assets/LogoNova.svg";

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
    toast.success("Cập nhật thành công");
    return null;
  } catch (error) {
    return error;
  }
};

export const loader = async () => {
  return null;
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

  const [isCheck, setIsCheck] = useState(false);

  const changeAddress = (event) => {
    setIsCheck(event.target.checked);
  };

  // const [cities, setCities] = useState([]);
  // const [city, setCity] = useState("");
  // const [districts, setDistricts] = useState([]);
  // const [district, setDistrict] = useState("");
  // const [wards, setWards] = useState([]);
  // const [ward, setWard] = useState("");


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
            <TextField
              InputProps={{
                readOnly: true,
              }}
              value={
                user?.address &&
                `${user?.address.city}, ${user?.address.district}, ${user?.address.ward}, ${user?.address.home}`
              }
              variant="standard"
              sx={{ width: "90%" }}
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
