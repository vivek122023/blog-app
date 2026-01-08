import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(
  cors({
    origin: process.env.Frontend_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ MongoDB connection with try-catch
console.log(process.env.MONGO_URI);

connectDB();

// routes
app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
