import express from 'express'
import {sendMessage , getChat , getHistory , updateChat} from '../controllers/chatController.js'; 
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/sendMessage',authMiddleware,sendMessage);

router.get('/getChat',authMiddleware,getChat);

router.get('/getHistory',authMiddleware,getHistory);

router.put('/updateChat',authMiddleware,updateChat);

export default router