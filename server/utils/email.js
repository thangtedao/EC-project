import nodemailer from "nodemailer";
import { htmlEmail } from "./mail.js";

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "xuanthang369@outlook.com",
    pass: "thangtedao123",
  },
});

export const sendMail = (user, order) => {
  const mailOptions = {
    from: '"Nova Shop" <xuanthang369@outlook.com>',
    to: user.email,
    subject: "Thanks for your purchase...",
    html: htmlEmail,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
