import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Wishlist.js";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { PRODUCT_STATUS } from "../utils/constants.js";
import {
  redirect,
  useLoaderData,
  useNavigate,
  NavLink,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { WishlistItem } from "../components";

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    const wishlist = await customFetch
      .get("/user/wishlist")
      .then(({ data }) => data);

    window.scrollTo(0, 0);
    return { user, wishlist };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    console.log(error);
    return error;
  }
};

const Wishlist = () => {
  const { wishlist } = useLoaderData();
  const navigate = useNavigate();

  const removeFromWishlist = async (id) => {
    try {
      await customFetch.patch("/user/wishlist/remove", {
        productId: id,
      });
      navigate("/wishlist");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Wishlist</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="title">Danh sách yêu thích</div>

        {wishlist.length > 0 ? (
          <div className="list-item">
            {wishlist.map((item, idx) => {
              return (
                <WishlistItem
                  key={idx}
                  item={item}
                  removeFromWishlist={removeFromWishlist}
                />
              );
            })}
          </div>
        ) : (
          <div className="empty-wishlist">Chưa có sản phẩm yêu thích nào</div>
        )}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Wishlist;
