import Wishlist from '../models/Wishlist.js'
import Cart from '../models/Wishlist.js'

// get cart and wishlist data

const getAnalysis  = async (req,res)=>{
    const farmerId = req.userId
    try {
       
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }
}