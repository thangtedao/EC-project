import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  table {
    background-color: white;
    width: 80%;
    margin-top: 2rem;
    border-collapse: collapse;
  }
  th {
    border: 1px solid lightgray;
    height: 20px;
  }
  tr {
    border: 1px solid lightgray;
  }
  td {
    border: 1px solid lightgray;
    height: 30px;
  }
  th,
  td {
    text-align: left;
    padding: 10px;
  }

  th:last-child,
  td:last-child,
  th:nth-last-child(2),
  td:nth-last-child(2) {
    width: 100px;
  }

  th:not(:last-child):not(:nth-last-child(2)),
  td:not(:last-child):not(:nth-last-child(2)) {
    width: 180px;
  }

  button {
    min-width: 80px;
    font-weight: bolder;
    border-radius: 23px;
    background: white;
    height: 30px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .ed-btn {
    border: 2px solid #035ecf;
    color: #035ecf;
    :hover {
      background-color: #035ecf;
      color: white;
    }
  }
  .dl-btn {
    border: 2px solid #ff5470;
    color: #ff5470;
    :hover {
      background-color: #ff5470;
      color: white;
    }
  }
  @media (max-width: 1550px) {
  }
`;

export const loader = async () => {
  try {
    const coupons = await customFetch
      .get(`/coupon`)
      .then(({ data }) => data.coupons);
    return coupons;
  } catch (error) {
    return error;
  }
};

const AllCoupon = () => {
  const coupons = useLoaderData();
  const navigate = useNavigate();

  const deleteCoupon = async (id) => {
    await customFetch.delete(`/coupon/delete/${id}`);
    console.log("deleted");
    navigate("/all-coupon");
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Coupon</title>
        </Helmet>

        <div className="title">All Coupon</div>

        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Expiry</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => {
              return (
                <tr key={coupon._id}>
                  <td>{coupon.name}</td>
                  <td>{coupon.description}</td>
                  <td>{coupon.discount}</td>
                  <td>{coupon.expiry}</td>
                  <td>
                    <button
                      className="ed-btn"
                      onClick={() => navigate(`/edit-coupon/${coupon._id}`)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="dl-btn"
                      onClick={() => deleteCoupon(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCoupon;
