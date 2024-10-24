import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getUser , updateUser ,getCart, addToCart , removeFromCart , updateCart , getWishlist , addToWishlist, removeFromWishlist} from "../controllers/accountController.js";

const router = express.Router()

// get user
router.post('/getUser',getUser)

// update user 
router.put('/updateUser',authMiddleware ,updateUser)

// get cart
router.get('/getCart',authMiddleware , getCart)

// add to cart
router.post('/addToCart',authMiddleware , addToCart)

// remove from cart 
router.delete('/removeFromCart',authMiddleware ,removeFromCart)

// update  cart 
router.put('/updateCart',authMiddleware ,updateCart)

// get wishlist
router.get('/getWishlist',authMiddleware , getWishlist)

// add to wishlist
router.post('/addToWishlist',authMiddleware , addToWishlist)

// remove from wishlist 
router.delete('/removeFromWishlist',authMiddleware ,removeFromWishlist)

export default router