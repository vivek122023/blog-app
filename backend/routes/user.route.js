import express from "express";
import {
  login,
  register,
  logout,
  getMyProfile,
  getAdmin,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middlewares/authUser.js";
import { get } from "mongoose";

const route = express.Router();
route.post("/register", register);
route.post("/login", login);
route.get("/logout", isAuthenticated, logout);
route.get("/my-profile", isAuthenticated, getMyProfile);
route.get("/admins", isAuthenticated, getAdmin);

export default route;
