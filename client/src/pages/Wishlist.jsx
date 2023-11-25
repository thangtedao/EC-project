import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Wrapper = styled.div`
  padding: 1rem;
  text-align: center;

  table {
    width: 1000px;
    font-size: 1.3rem;
    margin-top: 2rem;
  }
  th {
    height: 30px;
  }
  td {
    height: 100px;
    border-bottom: 1px solid lightgray;
  }
  th,
  td {
    text-align: left;
    padding: 1rem;
  }
  td:first-child {
    width: 50%;
  }

  .product-card {
    display: flex;
    gap: 1rem;
  }
  .product-info {
    display: grid;
    padding: 1rem 0;
  }
  .product-price {
    font-size: 1.1rem;
    color: #d70018;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    font-weight: bold;
  }
  .strike {
    font-size: 0.9rem;
    color: #707070;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  img {
    max-width: 110px;
  }

  .empty-wishlist {
    height: 600px;
    display: grid;
    place-items: center;
  }
`;

export const loader = async () => {
  try {
    let { user } = JSON.parse(localStorage.getItem("persist:user"));

    if (user !== "null") {
      user = JSON.parse(user);
      const wishlist = customFetch
        .get("/user/wishlist")
        .then(({ data }) => data.wishlist.wishlist);
      return wishlist;
    }
    return redirect("/login");
  } catch (error) {
    return error;
  }
};

const Wishlist = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  const removeFromWishlist = async (id) => {
    try {
      await customFetch.patch("/user/wishlist", {
        productId: id,
      });
      toast.success("Đã xóa sản phẩm ghét", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
      navigate("/wishlist");
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const wishlist = useLoaderData();
  return (
    <Wrapper>
      <h2 className="title">Wishlist</h2>
      {wishlist.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {wishlist?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <div className="product-card">
                        <img src={item?.images[0]} />
                        <div className="product-info">
                          <p>{item?.name}</p>
                          <p>{item?.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="product-price">
                        <p>
                          {item?.salePrice
                            ? item?.salePrice + "₫"
                            : item?.price + "₫"}
                        </p>
                        <p className="strike">
                          {item?.salePrice && item?.price + "₫"}
                        </p>
                      </div>
                    </td>
                    <td>Hết hàng</td>
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
        <div className="empty-wishlist">
          <h5>Chưa có sản phẩm yêu thích nào</h5>
        </div>
      )}
    </Wrapper>
  );
};

export default Wishlist;
