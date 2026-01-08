import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// isAuthentication
export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // same as cookie name
    console.log("Middleware : ", token);

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);
    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User not authenticated" });
  }
};


// isAuthorization
export const isAdmin = (...role) => {
  return (req, res, next) => {
    try { 
      if (!role.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: `User with given role ${req.user.role} is not allowed` });
      }     
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User not authorized" });
    }
  };
}