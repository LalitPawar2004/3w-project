// backend/controllers/postController.js
import Post from "../models/Post.js";
import User from "../models/User.js";

// ----------------- CREATE POST -----------------
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({ message: "Text or Image required" });
    }

    const imageFilename = file ? file.filename : "";

    const post = await Post.create({
      user: req.user._id,
      text: text || "",
      image: imageFilename,
    });

    await post.populate("user", "username email");

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------- GET ALL POSTS (with pagination) -----------------
export const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .populate("user", "username email")
      .populate("comments.user", "username")
      .populate("likes", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------- LIKE / UNLIKE POST -----------------
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;
    const alreadyLiked = post.likes.some(
      (id) => id.toString() === userId.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    // repopulate likes with usernames
    await post.populate("likes", "username");

    res.json({
      message: alreadyLiked ? "Unliked" : "Liked",
      likesCount: post.likes.length,
      likedBy: post.likes, // includes usernames now
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------- ADD COMMENT -----------------
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { text } = req.body;
    if (!text) return res.status(400).json({ message: "Comment text required" });

    post.comments.push({ user: req.user._id, text });
    await post.save();

    // repopulate comments with usernames
    await post.populate("comments.user", "username");

    res.json({
      message: "Comment added",
      commentsCount: post.comments.length,
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
