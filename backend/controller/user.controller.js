import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }

    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }

    const { email, name, password, role, education, phone } = req.body;
    console.log(email, name, password, phone, role, education);

    if (
      !email ||
      !name ||
      !password ||
      !phone ||
      !role ||
      !education ||
      !photo
    ) {
      return res
        .status(400)
        .json({ message: "Please all  field are required" });
    }
    const user = await User.findOne({ email }, { phone });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exits with this email." });
    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      phone,
      role,
      education,
      photo: {
        url: cloudinaryResponse.url,
        public_id: cloudinaryResponse.public_id,
      },
    });
    await newUser.save();

    if (newUser) {
      const token = await createTokenAndSaveCookies(newUser._id, res);

      res.status(201).json({
        message: "User register successfully",
        newUser,
        token,
      });
    }
  } catch (error) {
    //  DUPLICATE KEY ERROR HANDLE
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Phone or email already exists",
      });
    }

    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(404).json({ message: "User password is missing" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
      return res.status(404).json({ message: "Invalid user or password" });
    }
    if (user.role !== role) {
      return res.status(400).json({ message: `Given role ${role} not found` });
    }
    const token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
