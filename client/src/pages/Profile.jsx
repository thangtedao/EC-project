import { useState } from "react";
import Wrapper from "../assets/wrappers/Profile.js";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Select, TextField } from "@mui/material";
import NovaIcon from "../assets/logo/LogoNova.svg";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

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
              <div className="form-address">
                <TextField
                  required
                  size="small"
                  name="city"
                  label="Tỉnh/Thành phố"
                />
                <TextField
                  required
                  size="small"
                  name="district"
                  label="Quận/Huyện"
                />
                <TextField
                  required
                  size="small"
                  name="ward"
                  label="Phường/Xã"
                />
                <TextField
                  required
                  size="small"
                  name="home"
                  label="Số nhà, tên đường"
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
