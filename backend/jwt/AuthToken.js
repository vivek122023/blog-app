import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    // httpOnly: true,
    httpOnly: false, //xss
    secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    sameSite: "none", //csrf
  });
  await User.findByIdAndUpdate(userId, { token }, { new: true });
  return token;
};
export default createTokenAndSaveCookies;
