import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="order-container">
      <div className="order-title">
        <div>
          Order <span className="normal-text">#{order._id.slice(18)}</span>
        </div>
        <div>
          Order Status: <span className="normal-text">{order.orderStatus}</span>
        </div>
      </div>

      {order.products.map((item) => {
        return (
          <div key={item._id} className="product-item">
            <div className="product-image">
              <img src={item.product?.images[0]} alt="product image" />
            </div>

            <div className="product-info">
              <div className="product-info-name">{item.product?.name}</div>
              <div className="product-info-price">
                <div className="main-price">
                  <span>{item.product?.salePrice}đ</span>
                  <span className="strike">{item.product?.price}đ</span>
                </div>
              </div>
              <p>Số lượng: {item.count}</p>
            </div>

            <div className="order-status">
              Trạng thái:
              {order.orderStatus}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCard;
