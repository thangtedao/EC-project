import { useState } from "react";
// import customFetch from "../utils/customFetch";
// import customFetch from "../utils/customFetch";

const VnpayPayment = ( ) => {

  const [amount, setAmount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Gửi yêu cầu thanh toán đến backend
            const response = await fetch('http://localhost:3001/api/order/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: amount, bankCode:'', language:'vn' })
            });
            // const response = await customFetch('/order/create_payment_url',{ amount: amount, bankCode:'', locale:'vn' })
            const data = await response.json();
            // Chuyển hướng người dùng đến cổng thanh toán của VNPAY
            // console.log(response);

            // console.log(data);
            // const redirectUrl = new URL(data);
            window.location.href = data.redirectUrl
        } catch (error) {
            console.error('Lỗi:', error);
        }
    };


  return (
    <div className="table-responsive">
      <form id="createOrder" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Số tiền</label>
          <input
            className="form-control"
            id="amount"
            name="amount"
            placeholder="Số tiền"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
      
        <button className="btn btn-default" id="btnPopup" type="submit">
          Thanh toán
        </button>
      </form>
      <p>&nbsp;</p>
    </div>
  );
};

export default VnpayPayment;
