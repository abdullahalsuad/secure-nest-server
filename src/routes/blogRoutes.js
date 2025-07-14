import express from "express";
import * as blogController from "../controllers/blogController.js";

const router = express.Router();

// Create a new blog
router.post("/add-blog", blogController.addBlog);

// Get all blogs
router.get("/blogs", blogController.getAllBlogs);

// Get a single blog
router.get("/blogs/:id", blogController.getABlog);

// Delete a blog
router.delete("/blogs/:id", blogController.removeBlog);

// Update a blog
router.patch("/blogs/:id", blogController.updateBlog);

// Blogs for a specific user
router.get("/my-blogs/:userId", blogController.getBlogsByUser);

export default router;
