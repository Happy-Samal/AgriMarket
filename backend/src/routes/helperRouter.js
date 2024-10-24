import express from 'express'
import { otpVerification, setPassword , otpGenerate, sendEmail } from '../controllers/helperController.js'

const router = express.Router()

// otp generate
router.get('/otpGenerate',otpGenerate)

// otp verification
router.get('/otpVerification',otpVerification)

// set password
router.post('/setPassword',setPassword)

// send email
router.post('/sendEmail',sendEmail)



export default router