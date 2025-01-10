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


    // const otpEmailTemplate = path.join(process.cwd(), 'public', 'otpEmail.ejs');
    const otpEmailTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email Template</title>
    <style>
        .container {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background-color: #f9f9f9;
        }

        .header {
            text-align: center;
            background-color: #4CAF50;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }

        .header h1 {
            color: white;
            margin: 0;
        }

        .content {
            margin-top: 20px;
        }

        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            padding: 10px;
            background-color: #f1f1f1;
            border-radius: 5px;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>AgriMarket</h1>
        </div>
        <div class="content">
            <p>Dear <%= username %> ,</p>
            <p>Thank you for using AgriMarket. Please use the following OTP to complete your verification process. This OTP is valid for 1 day.</p>
            <div class="otp"><%= text %></div>
            <p>If you did not request this OTP, please ignore this email.</p>
            <p>Thank you,<br>AgriMarket Team</p>
        </div>
        <div class="footer">
            &copy; 2024-25 AgriMarket. All rights reserved.
        </div>
    </div>
</body>
</html>`;

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

