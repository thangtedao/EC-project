import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/User.js";
import { passwordHash, comparePassword } from "../utils/passwordHash.js";
import { createJWT } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    req.body.password = await passwordHash(req.body.password);

    await User.create(req.body);
    res.status(201).json({ msg: "user created" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const isValidUser =
      user && (await comparePassword(password, user.password));
    if (!isValidUser)
      throw new UnauthenticatedError("email or password is not correct");

    // if (!user) {
    //   return res.json({ msg: "user is not exist" });
    // }
    // const isMatch = await comparePassword(password, user.password);
    // console.log(`${password} --${isMatch}-- ${user.password}`);
    // if (!isMatch) throw new UnauthenticatedError("password is not correct ");

    const token = createJWT({ userId: user.id, role: user.role });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(StatusCodes.OK).json({ msg: "user logged in" });
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
