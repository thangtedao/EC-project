import React, { useState } from "react";
import Wrapper from "../assets/wrapper/promotion/AddEvent.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import EventInfor from "../components/EventPage/EventInfor.jsx";
import EventProduct from "../components/EventPage/EventProduct.jsx";
// import EventCoupon from "../components/EventPage/EventCoupon.jsx";
import EventCheck from "../components/EventPage/EventCheck.jsx";
import { Button, message, Steps, Form, Breadcrumb } from "antd";
import customFetch from "../utils/customFetch.js";
import { useLoaderData, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const loader = async () => {
  try {
    const products = await customFetch
      .get(`/product/?populate=category`)
      .then(({ data }) => data);

    const categories = await customFetch
      .get("/category/all-categories")
      .then(({ data }) => data);

    const categoriesC = await customFetch
      .get(`/category/get/child`)
      .then(({ data }) => data);

    const orders = await customFetch.get(`/order/`).then(({ data }) => data);

    return { products, categories, categoriesC, orders };
  } catch (error) {
    return error;
  }
};

const EditEvent = () => {
  let { products, categories, categoriesC, orders } = useLoaderData();
  const navigate = useNavigate();

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  categories = categories?.map((category) => {
    category.key = category._id;
    if (!category.parent) {
      category.children = categoriesC
        ?.filter((itemC) => itemC.parent === category._id)
        .map((itemC) => {
          itemC.key = itemC._id;
          return itemC;
        });

      return category;
    }
    return null;
  });

  categories = categories?.filter((item) => item !== null);

  products.forEach((product) => {
    product.sold = orders.reduce((total, order) => {
      return (
        total +
        order.orderItem.filter((item) => product._id === item.product.id).length
      );
    }, 0);
  });

  const [current, setCurrent] = useState(0);

  // Info
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  // Product
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleAddEvent = async () => {
    try {
      if (name && discount && startDate && endDate && selectedProductIds) {
        const data = {
          name,
          description,
          discountValue: discount,
          startDate: startDate.format(dateFormat),
          endDate: endDate.format(dateFormat),
          products: selectedProductIds,
        };
        const promotion = await customFetch.post("/promotion/create", data);
        if (promotion) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Infor",
      content: (
        <EventInfor
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          discount={discount}
          setDiscount={setDiscount}
          dates={[startDate, endDate]}
          handleDateRangeChange={handleDateRangeChange}
        />
      ),
    },
    {
      title: "Choose product",
      content: (
        <EventProduct
          products={products}
          categories={categories}
          selectedProductIds={selectedProductIds}
          setSelectedProductIds={setSelectedProductIds}
          setSelectedProducts={setSelectedProducts}
        />
      ),
    },
    {
      title: "Check",
      content: (
        <EventCheck
          name={name}
          description={description}
          discount={discount}
          startDate={startDate}
          endDate={endDate}
          products={products}
          categories={categories}
          selectedProducts={selectedProducts}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit Event</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-event">Event</a>,
            },
            {
              title: "Edit Event",
            },
          ]}
        />

        <div className="title">Edit Event</div>
        <Steps current={current} items={items} />
        <div
          style={{ lineHeight: "260px", textAlign: "center", marginTop: 16 }}
        >
          {steps[current].content}
        </div>
        <div style={{ marginTop: 20 }}>
          {current < steps.length - 1 && (
            <Button size="large" type="primary" onClick={next}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              size="large"
              type="primary"
              onClick={() => handleAddEvent()}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button size="large" style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditEvent;
