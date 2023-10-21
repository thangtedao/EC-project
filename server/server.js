import express from "express";
import dotenv from "dotenv";
import jobRouter from "../server/routes/jobRoute.js";
import authRouter from "../server/routes/authRoute.js";
import userRouter from "../server/routes/userRoute.js";
import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ msg: "test route" });
});

/*
    app.post('/test', validateTest, (req, res) => {
        //sth
    })
*/

app.use("/api/job", authenticateUser, jobRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/auth", authRouter);

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
