import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Link to Category
  tags: [{ type: String }], // Array of tags
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of Users who liked the post
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model('Post', postSchema);
