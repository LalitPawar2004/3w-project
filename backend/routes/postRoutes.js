// backend/routes/postRoutes.js
import express from "express";
import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create post with optional image upload
// Use 'image' as the form field name for the file
router.post("/", protect, upload.single("image"), createPost);

// Public feed
router.get("/", getAllPosts);

// Likes and comments (protected)
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);

export default router;
