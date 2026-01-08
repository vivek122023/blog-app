import express from "express";
import cloudinary from "cloudinary";
import Blog from "../models/blog.model.js";
import e from "express";
import mongoose from "mongoose";

export const createdBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }

    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res.status(400).json({
        message: "Invalid blogImage format. Only jpg and png are allowed",
      });
    }

    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category & about are required fields" });
    }
    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "blogImage upload failed" });
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    console.log("param:", req.params);
    const { BlogId } = req.params;

    const blog = await Blog.findById(BlogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    res.status(200).json({ allBlogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const singleBlog = async (req, res) => {
  try {
    // console.log(req.params)
    const { blogId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const blogs = await Blog.find({ createdBy: userId });
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const updateBlog = async (req, res) => {
//   try {
//     console.log(req.params)
//     const { blogId } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(blogId)) {
//       return res.status(400).json({ message: "Invalid blog id" });
//     }
//     const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
//       new: true,
//     });
//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json({
//       message: "Blog updated successfully",
//       updatedBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    // 1️⃣ Validate blog ID
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    // 2️⃣ Find existing blog
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // 3️⃣ Update text fields
    const { title, category, about } = req.body;
    if (title) blog.title = title;
    if (category) blog.category = category;
    if (about) blog.about = about;

    // 4️⃣ Update image if a new file is uploaded
    if (req.files && req.files.blogImage) {
      const blogImage = req.files.blogImage;

      // Optional: validate image type
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedFormats.includes(blogImage.mimetype)) {
        return res.status(400).json({
          message: "Invalid image format. Only jpg, png, webp allowed.",
        });
      }

      // 🔹 Delete old image from Cloudinary if exists
      if (blog.blogImage?.public_id) {
        await cloudinary.uploader.destroy(blog.blogImage.public_id);
      }

      // 🔹 Upload new image to Cloudinary
      const result = await cloudinary.uploader.upload(blogImage.tempFilePath, {
        folder: "blogs",
      });

      // 🔹 Save new image info
      blog.blogImage = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    // 5️⃣ Save blog
    await blog.save();

    // 6️⃣ Return updated blog
    res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog: blog,
    });
  } catch (error) {
    console.log("UPDATE BLOG ERROR ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
