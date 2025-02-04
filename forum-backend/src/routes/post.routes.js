import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost, likePost } from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router()


router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/like/:postId', authMiddleware, likePost);

export default router;

