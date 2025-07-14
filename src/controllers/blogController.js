import BlogModel from "../models/blogModel.js";

// Create new blog post
export const addBlog = async (req, res) => {
  try {
    const blog = new BlogModel(req.body);

    const savedBlog = await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single blog post
export const getABlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post
export const removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all blogs for a specific user
export const getBlogsByUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const blogs = await BlogModel.find({ userId: userId });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
