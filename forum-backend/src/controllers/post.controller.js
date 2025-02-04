import { Post } from '../models/post.model.js';
import Category from '../models/categories.model.js';

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    
    // Validate category existence
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const newPost = new Post({
      title,
      content,
      category,
      tags,
      author: req.user.id
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'username')
      .populate('comments', 'content createdAt');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('author', 'username')
      .populate('comments', 'content createdAt');

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Ensure only the author can update the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;

    await post.save();
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Ensure only the author or admin can delete the post
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};

// Like or Unlike a post

// Like or Unlike a Post
const likePost = async (req, res) => {
  try {
      const postId = req.params.postId;
      const userId = req.user.id; // Ensure authentication middleware is used

      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });

      const index = post.likes.indexOf(userId);
      if (index === -1) {
          post.likes.push(userId); // Like the post
      } else {
          post.likes.splice(index, 1); // Unlike the post
      }

      await post.save();
      res.json({ success: true, likes: post.likes.length });
  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
};



export {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost
}