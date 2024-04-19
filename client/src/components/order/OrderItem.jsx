import React from "react";
import { NavLink } from "react-router-dom";

const OrderItem = ({ order, cancelOrder }) => {
  return (
    <div className="order-container">
      <div className="order-header">
        <div className="order-header-info">
          <div>
            Order ID <span className="normal-text">#{order._id.slice(18)}</span>
          </div>

          <div>
            Total Amount:{" "}
            <span className="normal-text">
              {order.totalAmount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              ₫
            </span>
          </div>

          {order.discountAmount && (
            <div>
              Discount Amount:{" "}
              <span className="normal-text">
                {order.discountAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                ₫
              </span>
            </div>
          )}

          <div>
            Status: <span className="normal-text">{order.status}</span>
          </div>
        </div>

        {order.isCancel ? (
          <button onClick={() => cancelOrder(order._id, false)} className="btn">
            Cancel Cancel Order
          </button>
        ) : (
          order.status === "Pending" && (
            <button
              onClick={() => cancelOrder(order._id, true)}
              className="btn"
            >
              Cancel Order
            </button>
          )
        )}
      </div>

      {order.orderItem.map((item, idx) => {
        return (
          <div key={idx} className="product-item-outer">
            <img
              className="product-image"
              src={item.product?.images[0]}
              alt="Image"
            />

            <div className="product-info">
              <NavLink to={`/product/${item?.product?.id}`}>
                {item?.product?.name}
              </NavLink>

              <div className="product-variant">
                {item.variant?.map((i, index) => {
                  return <div key={index}>{i.value}</div>;
                })}
              </div>

              <div className="product-price">
                <span>
                  {(
                    (item.variant?.reduce((a, i) => a + i.price, 0) +
                      item.product.price) *
                    item.quantity
                  )
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  ₫
                </span>

                {/* <span className="strike">{item.product?.price}₫</span> */}
              </div>
            </div>

            <div className="product-quantity">{"x" + item?.quantity}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
