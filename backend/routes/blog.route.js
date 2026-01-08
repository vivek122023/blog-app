import express from "express";
import {
  createdBlog,
  deleteBlog,
  getAllBlogs,
  singleBlog,
  getMyBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { isAuthenticated, isAdmin } from "../middlewares/authUser.js";

const route = express.Router();

route.post("/create-blog", isAuthenticated, isAdmin("admin"), createdBlog);
route.delete(
  "/delete-blog/:BlogId",
  isAuthenticated,
  isAdmin("admin"),
  deleteBlog
);
route.get("/all-blogs", getAllBlogs);
route.get("/single-blog/:blogId", isAuthenticated, singleBlog);
route.get("/my-blogs", isAuthenticated, isAdmin("admin"), getMyBlogs);
route.put(
  "/update-blog/:blogId",
  isAuthenticated,
  isAdmin("admin"),
  updateBlog
);  

export default route;
