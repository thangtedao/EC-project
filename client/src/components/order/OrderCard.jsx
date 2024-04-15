import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="order-container">
      <div className="order-title">
        <div>
          Đơn Hàng <span className="normal-text">#{order._id.slice(18)}</span>
        </div>
        <div>
          Tổng tiền{" "}
          <span className="normal-text">
            {order.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            ₫
          </span>
        </div>
        <div>
          Trạng thái: <span className="normal-text">{order.status}</span>
        </div>
      </div>

      {order.orderItem.map((item, idx) => {
        return (
          <div key={idx} className="product-item">
            <div className="product-image">
              <img src={item.product?.images[0]} alt="product image" />
            </div>

            <div className="product-info">
              <div className="product-info-name">{item.product?.name}</div>
              <div className="product-info-name">
                {item.variant?.map((i, index) => {
                  return <div key={index}>{i.value}</div>;
                })}
              </div>
              <div className="product-info-price">
                <div className="main-price">
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
              <p>Số lượng: {item.quantity}</p>
            </div>

            <div className="order-status">{order.status}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
