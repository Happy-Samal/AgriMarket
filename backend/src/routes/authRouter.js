import express from 'express'
import authMiddleware from "../middleware/authMiddleware.js";

import { signup, login, logout, deleteAccount , isLogin } from '../controllers/authController.js'

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.get('/logout', authMiddleware, logout);

// deleteAccount route
router.get('/deleteAccount', authMiddleware , deleteAccount);

// isLogin
router.get('/isLogin',authMiddleware,isLogin)

export default router;