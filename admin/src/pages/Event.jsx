import React, { useState } from "react";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import EventInfor from "../components/EventPage/EventInfor.jsx";
import EventProduct from "../components/EventPage/EventProduct.jsx";
import EventCoupon from "../components/EventPage/EventCoupon.jsx";
import EventCheck from "../components/EventPage/EventCheck.jsx";
import {
  Button,
  message,
  Steps,
  Form,
  Card,
  Typography,
  Input,
  DatePicker,
  Breadcrumb,
} from "antd";

const Wrapper = styled.div`
  width: 100%;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .ant-steps {
    margin-top: 50px;
    margin-bottom: 50px;
  }
`;

const { RangePicker } = DatePicker;

const steps = [
  {
    title: "Infor",
    content: <EventInfor />,
  },
  {
    title: "Choose product",
    content: <EventProduct />,
  },
  {
    title: "Coupon",
    content: <EventCoupon />,
  },
  {
    title: "Check",
    content: <EventCheck />,
  },
];

const Event = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Event</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/event">Event</a>,
            },
            {
              title: "Add Event",
            },
          ]}
        />

        <div className="title">Event</div>
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
              onClick={() => message.success("Processing complete!")}
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

export default Event;
