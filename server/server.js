import express from "express";
import dotenv from "dotenv";
import authRouter from "../server/routes/authRoute.js";
import userRouter from "../server/routes/userRoute.js";
import categoryRouter from "../server/routes/categoryRoute.js";
import productRouter from "../server/routes/productRoute.js";
import blogRouter from "../server/routes/blogRoute.js";
import couponRouter from "../server/routes/couponRoute.js";
import colorRouter from "../server/routes/colorRoute.js";
import orderRouter from "../server/routes/orderRoute.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

// public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(cookieParser());
app.use(express.json());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
      "connect-src": [
        "'self'",
        "https://provinces.open-api.vn",
        "https://www.paypal.com",
        "https://www.sandbox.paypal.com",
      ],
      "script-src": ["'self'", "https://www.paypal.com"],
      "frame-src": ["'self'", "https://www.sandbox.paypal.com"],
    },
  })
);
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../admin/dist")));
// app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/order", orderRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../admin/dist", "index.html"));
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
// });

// Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error Middleware
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3001;

/*
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    } 
*/

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
  })
  .catch((error) => console.log(error));
