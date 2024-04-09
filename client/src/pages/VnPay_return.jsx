// import React from 'react'
import { useEffect, useState } from 'react';

const VnPay_return = () => {
    const [code, setCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                console.log(queryParams.toString())
                // Gửi yêu cầu thanh toán đến backend
                const response = await fetch('http://localhost:3001/api/order/vnpay_return?'+queryParams.toString(), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                console.log(data);
                console.log('dmm')
                setCode(data.code);
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };

        fetchData();
    }, []);
  return (
    <div style={{textAlign: 'center'}}>
        {code === "00" ? <p>GD thành công</p> : <p style={{color: 'red'}}>GD thất bại</p>}
        <p>
            <a className="btn btn-default" href="/cart/vnpay-payment">Về vnpay-payment</a>
        </p>
    </div>
);
}

export default VnPay_return