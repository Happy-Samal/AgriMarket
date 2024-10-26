import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { SMTPClient } from 'emailjs';
import ejs from 'ejs';
import path from "path";

// otp create
const otpCreated = () => {
    return Math.floor(1000 + Math.random() * 9000);
}

// otp generate
const otpGenerate = async (req, res) => {
    try {
        const otp = otpCreated()
        const saltRounds = 10;
        const hashOTP = await bcrypt.hash(otp.toString(), saltRounds)
        return res.status(201).cookie('agrimarketO', hashOTP, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None',
            path:'/'
        }).json({
            otp: otp
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// otpVerification
const otpVerification = async (req, res) => {
    const getOTP = req.query.otp; // Extract the 'otp' query parameter
    const hashOTP = req.cookies.agrimarketO
    const result = await bcrypt.compare(getOTP, hashOTP)
    if (!result) {
        return res.status(400).json({
            success: false,
            message: "OTP is Incorrect!"
        })
    }
    return res.status(200).json({
        success: true,
        message: "OTP verified successfully!"
    })
}

// setPassword
const setPassword = async (req, res) => {
    const password = req.query.password
    const email = req.query.email
    const saltRounds = 10;
    try {
        const hashPass = await bcrypt.hash(password, saltRounds)
        await User.findOneAndUpdate({ email: email }, { password: hashPass })
        return res.status(200).json({
            success: true,
            message: "password update!"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// send email via emailjs
const sendEmail = async (req, res) => {
    const server = new SMTPClient({
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });


    const otpEmailTemplate = path.join(process.cwd(), 'public', 'otpEmail.ejs');

    try {

        const htmlContent = await ejs.renderFile(otpEmailTemplate, {
            text: req.body.text,
            username: req.body.username
        })

        const message = await server.sendAsync({
            from: `AgriMarket Team <${process.env.GMAIL_USER}>`,
            to: `${req.body.username} <${req.body.email}>`,
            subject: req.body.subject,
            attachment: [
                { data: htmlContent, alternative: true }
            ]
        });
        res.status(200).json({
            success: true,
            message: 'Email Sent Successfully!',
            sent: true
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            sent: false,
        })
    }
}


export { otpVerification, setPassword, otpGenerate, sendEmail  }

