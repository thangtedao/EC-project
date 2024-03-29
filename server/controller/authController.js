import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { passwordHash, comparePassword } from "../utils/passwordHash.js";
import { createJWT } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    req.body.password = await passwordHash(req.body.password);

    await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "User Created" });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isValidUser =
      user && (await comparePassword(password, user.password));
    if (!isValidUser)
      throw new UnauthenticatedError("Email or Password is not correct");

    const token = createJWT({ userId: user.id, role: user.role });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.OK).json({ msg: "User logged in", token: token });
  } catch (error) {
    res.status(StatusCodes.CONFLICT).json({ msg: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};
