import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Wrapper from "../assets/wrappers/Coupon";
import Logo from "../assets/logo/NovaCoupon.svg";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FileCopyOutlined } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useState } from "react";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    const { coupon } = await customFetch
      .get("/user/coupon")
      .then(({ data }) => data);

    window.scrollTo(0, 0);
    return { coupon };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Coupon = () => {
  const { coupon } = useLoaderData();

  const [coupons, setCoupon] = useState(coupon);
  const [code, setCode] = useState();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const saveCoupon = async () => {
    try {
      if (code) {
        await customFetch.patch("/user/coupon", { code });

        const fetchCoupon = await customFetch
          .get("/user/coupon")
          .then(({ data }) => data.coupon);

        setCoupon(fetchCoupon);
      } else toast.warning("Nhập coupon");
    } catch (error) {
      return toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coupon</title>
        </Helmet>

        <div
          style={{
            width: "30%",
            marginBottom: "20px",
            marginTop: "30px",
            display: "flex",
          }}
        >
          <TextField
            size="small"
            label="Coupon"
            placeholder="Enter coupon"
            onChange={(event) => setCode(event.target.value)}
          />
          <button className="btn" onClick={() => saveCoupon()}>
            Lưu
          </button>
        </div>

        <div style={{ width: "100%" }}>
          <div className="list-coupon">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {coupons?.map((item, idx) => {
                return (
                  <div key={idx}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
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
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.code}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "block" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {item.name}
                            </Typography>

                            {item.startDate?.split("T")[0] +
                              " - " +
                              item.endDate?.split("T")[0]}
                          </React.Fragment>
                        }
                      />
                      <div className="copy-button-container">
                        <Button
                          onClick={() => handleCopy(item.code)}
                          startIcon={<FileCopyOutlined />}
                          variant="text"
                        >
                          Copy
                        </Button>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })}
            </List>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Coupon;
