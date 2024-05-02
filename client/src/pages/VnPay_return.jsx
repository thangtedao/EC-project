import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const VnPay_return = () => {
  const [code, setCode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vnp_Params = new URLSearchParams(window.location.search);

        const code = await customFetch
          .get("/order/vnpay_return?" + vnp_Params.toString())
          .then(({ data }) => data.code);

        if (code === "00") {
          try {
            console.log("Tạo đơn thành công");
            // await customFetch
            //   .post("/order/create-order")
            //   .then(({ data }) => data);
          } catch (error) {
            toast.error(error?.response?.data?.msg);
          }
        }
        setCode(code);
      } catch (error) {
        console.error("Lỗi vnpay-return:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      {code === "00" ? (
        <p>Giao dịch thành công</p>
      ) : (
        <p style={{ color: "red" }}>GD thất bại thất bại</p>
      )}
      <p>
        <a className="btn btn-default" href="/order">
          Xem đơn đặt hàng của bạn
        </a>
      </p>
    </div>
  );
};
export default VnPay_return;
