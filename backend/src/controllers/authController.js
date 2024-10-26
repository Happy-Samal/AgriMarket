import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'
import Chat from '../models/Chat.js'
import Wishlist from '../models/Wishlist.js'


// signup an user
const signup = async (req, res) => {
    const saltRounds = 10;
    const ExistUser = await User.findOne({ email: req.body.email })
    if (ExistUser) {
        return res.status(200).json({
            success: false,
            message: 'User already Exist!',
        });
    }
    const hashPass = await bcrypt.hash(req.body.password, saltRounds)
    try {
        req.body.password = hashPass
        await User.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Signed in successfully!',
            redirectUrl: '/user/login',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}

// login an user
const login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User doesn't exist!"
        })
    }
    const result = await bcrypt.compare(req.body.password, user.password)
    if (!result) {
        return res.status(400).json({
            success: false,
            message: "Incorrect password!"
        })
    }
    // create jwt
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).cookie('agrimarketT', token, {
        httpOnly: true,
        secure:true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'None' ,
        path:'/'
    }).json({
        success: true,
        message: 'Login Successfully!',
        redirectUrl: '/'
    });
    
}

// logout
const logout = async (req, res) => {
    res.status(200).clearCookie('agrimarketT', {
        httpOnly: true, 
        secure: true,  
        sameSite: 'None',
        path:'/'
    }).json({
        success: true,
        message: "Logout Successfully!",
        redirectUrl: '/'
    });
};


// delete the user
const deleteAccount = async(req,res)=>{
    const userId = req.userId
    try {
        await User.findOneAndDelete({_id:userId})
        await Product.findOneAndDelete({farmer:userId})
        await Cart.findOneAndDelete({user:userId})
        await Wishlist.findOneAndDelete({user:userId})
        await Chat.findOneAndDelete({
            $or: [
                { sender: userId},
                { receiver: userId }
            ]
        })
        res.status(200).clearCookie('agrimarketT', {
            httpOnly: true, 
            secure: true,  
            sameSite: 'None',
            path:'/'
        }).json({
            success: true,
            message: "Account delete Successfully!",
            redirectUrl: '/'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

}

// isLogin
const isLogin= async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exist!"
            })
        }
        return res.status(200).json({
            success: true,
            user: user,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}

export { signup, login , logout , deleteAccount , isLogin}