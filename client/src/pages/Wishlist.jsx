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
        {wishlist.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {wishlist?.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td>
                        <div className="product-card">
                          <div className="image">
                            <img src={item?.images[0]} />
                          </div>

                          <div className="product-info">
                            <span className="product-name">
                              <NavLink to={`/product/${item?.slug}`}>
                                {item?.name}
                              </NavLink>
                            </span>
                            <span style={{ fontSize: "0.9rem" }}>
                              {item.description.length > 50
                                ? item.description.slice(0, 50) + "..."
                                : item.description}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="product-price">
                          <p>
                            {item?.salePrice
                              ? item?.salePrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"
                              : item?.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                          </p>
                          <p className="strike">
                            {item?.salePrice &&
                              item?.price
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "₫"}
                          </p>
                        </div>
                      </td>
                      <td>
                        {item.status === PRODUCT_STATUS.AVAILABLE ? (
                          <AddShoppingCartIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() =>
                              addToCartBtn({ ...item, count: 1 }, user)
                            }
                          />
                        ) : (
                          <div
                            style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                          >
                            {item.status}
                          </div>
                        )}
                      </td>
                      <td>
                        <DeleteIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => removeFromWishlist(item._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-wishlist">Chưa có sản phẩm yêu thích nào</div>
        )}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Wishlist;
