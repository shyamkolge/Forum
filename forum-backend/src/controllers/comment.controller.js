import {Comment , Reply} from '../models/comment.js'
import {Post} from '../models/post.model.js'

// Add a Comment to a Post
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);
    
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const newComment = new Comment({
      post: req.params.postId,
      user: req.user.id,
      content
    });

    await newComment.save();
    post.comments.push(newComment._id); // Link comment to post
    await post.save();

    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// Get all Comments for a Post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username')
      .populate('replies', 'content createdAt');

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};

// Delete a Comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await comment.deleteOne();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting comment' });
  }
};

// Add a Reply to a Comment
const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await Comment.findById(req.params.commentId);
    
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const newReply = new Reply({
      comment: req.params.commentId,
      user: req.user.id,
      content
    });

    await newReply.save();
    comment.replies.push(newReply._id); // Link reply to comment
    await comment.save();

    res.status(201).json({ message: 'Reply added', reply: newReply });
  } catch (error) {
    res.status(500).json({ error: 'Error adding reply' });
  }
};

// Like a Comment
const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.likes.push(req.user.id); // Like comment
    } else {
      comment.likes.splice(userIndex, 1); // Unlike comment
    }

    await comment.save();
    res.json({ message: 'Like updated', likes: comment.likes.length });
  } catch (error) {
    res.status(500).json({ error: 'Error liking comment' });
  }
};


export {addComment , getComments , deleteComment , addReply , likeComment}