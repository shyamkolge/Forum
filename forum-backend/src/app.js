import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

import authRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/commnets.routes.js"; // Fixed typo
import categoriesRoutes from './routes/categories.routes.js'

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // Default to all origins if not set
    credentials: true,
  })
);

// Middleware
app.use(express.json()); // JSON body parser

// Routes
app.use("/api/auth", authRoutes); // User Authentication (Login, Signup)
app.use("/api/posts", postRoutes); // Posts API
app.use("/api/comments", commentRoutes); // Comments & Replies API


app.use("/api/categories", categoriesRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Healthcare Forum API is running...");
});



export { app };
