// import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
// import { useLoaderData} from "react-router-dom";
// import customFetch from '../utils/customFetch';
import { toast } from "react-toastify";

const VnPay_return = () => {
  const [code, setCode] = useState(null);
  const [orderCreated, setOrderCreated] = useState(false); // Thêm biến flag orderCreated
  const user = useSelector((state) => state.user.user);
  const cart = JSON.parse(localStorage.getItem('cart'));
  const coupon = JSON.parse(localStorage.getItem('coupon'));

  useEffect(() => {
      const fetchData = async () => {
          try {
              const queryParams = new URLSearchParams(window.location.search);
              const response = await fetch('http://localhost:3001/api/order/vnpay_return?' + queryParams.toString(), {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  },
              });
              const data = await response.json();
              if (data.code === '00' && !orderCreated) { // Kiểm tra orderCreated trước khi gửi yêu cầu
                  try {
                      const res = await fetch(`http://localhost:3001/api/order/create-order`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({ cart, user, coupon })
                      });
                      const result = await res.json();
                      console.log(result);
                      setOrderCreated(true); // Đánh dấu đã tạo order
                  } catch (error) {
                      toast.error(error?.response?.data?.msg);
                  }
              }
              setCode(data.code);
          } catch (error) {
              console.error('Lỗi vnpay-return:', error);
          }
      };

      fetchData();
  }, []); // Sử dụng orderCreated trong dependency array của useEffect
  return (
    <div style={{textAlign: 'center'}}>
        {code === "00" ? <p>Giao dịch thành công</p>
        : <p style={{color: 'red'}}>GD thất bại thất bại</p>}
        <p>
            <a className="btn btn-default" href="/order">Xem đơn đặt hàng của bạn</a>
        </p>
    </div>
  );
}
export default VnPay_return