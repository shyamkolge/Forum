import express from 'express';
import { Router } from 'express';
import { addComment, getComments, deleteComment, addReply, likeComment } from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/:postId', authMiddleware, addComment); // Add a comment to a post
router.get('/:postId', getComments); // Get all comments for a post
router.delete('/:commentId', authMiddleware, deleteComment); // Delete a comment
router.post('/:commentId/replies', authMiddleware, addReply); // Add a reply to a comment
router.post('/:commentId/like', authMiddleware, likeComment); // Like a comment

export default router;
