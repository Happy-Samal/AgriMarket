import express from 'express'
import authMiddleWare from '../middleware/authMiddleware.js'
import {createRzyOrder , rzyCallBackUrl } from '../controllers/razorpayController.js'

const router = express.Router()

// payment api
router.post('/createRzyOrder',authMiddleWare , createRzyOrder)

// callback 
router.post('/rzyCallBackUrl', rzyCallBackUrl)

export default router