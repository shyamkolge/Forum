import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Linked to Post
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Commenter
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the comment
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reply' }], // Replies to the comment
  createdAt: { type: Date, default: Date.now }
});

const replySchema = new mongoose.Schema({
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }, // Parent Comment
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

export { Comment, Reply };
