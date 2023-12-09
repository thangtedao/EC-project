import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  redirect,
  useLoaderData,
  useNavigate,
  NavLink,
} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { addToCart } from "../state/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import NovaIcon from "../assets/LogoNova.svg";

const Wrapper = styled.div`
  padding: 1rem;
  text-align: center;

  .title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    text-align: center;
  }

  table {
    width: 800px;
    font-size: 1rem;
    margin-top: 2rem;
  }
  th {
    height: 30px;
    border-bottom: 1px solid lightgray;
  }
  td {
    height: 80px;
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
    height: 100px;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 0;
    margin-left: 0.5rem;
    .product-name {
      font-size: 1.1rem;
      font-weight: bold;
    }
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
  .image {
    width: 120px;
    height: 100px;
    img {
      max-width: 300px;
      height: inherit;
    }
  }

  .empty-wishlist {
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }

  @media (max-width: 838px) {
    table {
      width: 100%;
    }
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
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const addToCartBtn = debounce((product, user) => {
    dispatch(addToCart({ product: { ...product, count: 1 }, user }));
    toast.success("Thêm vào giỏ thành công", {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
  }, 100);

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
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Wishlist</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="title">Danh sách yêu thích</div>
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
                              ? item?.salePrice + "₫"
                              : item?.price + "₫"}
                          </p>
                          <p className="strike">
                            {item?.salePrice && item?.price + "₫"}
                          </p>
                        </div>
                      </td>
                      <td>
                        <AddShoppingCartIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() =>
                            addToCartBtn({ ...item, count: 1 }, user)
                          }
                        />
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
