import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import bcrypt from 'bcrypt';

// get user 
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { _id: req.body.id }
            ]
        })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Found!"
            })
        }
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

//update user 
const updateUser = async (req, res) => {
    const saltRounds = 10;
    try {
        if (req.body.password) {
            const hashPass = await bcrypt.hash(req.body.password, saltRounds)
            req.body.password = hashPass
        }
        const updateUser = await User.findOneAndUpdate({ email: req.body.email }, req.body, { new: true }).select('-password')
        res.status(200).json({
            success: true,
            user: updateUser,
            message: "Update Successfully!"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        })
    }
}

// add to cart
const addToCart = async (req, res) => {
    const userId = req.userId;
    const { pId } = req.body

    try {
        const userCart = await Cart.findOne({ user: userId })
        if (userCart) {
            userCart.products.push({
                product: pId
            })
            await userCart.save()
        } else {
            await Cart.create({
                user: userId,
                products: [{ product: pId }],
            });
        }

        res.status(200).json({
            success: true,
            message: "Added to your cart"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// get cart
const getCart = async (req, res) => {
    const userId = req.userId;
    try {
        const userCart = await Cart.findOne({ user: userId }).populate('products.product')
        res.status(200).json({
            success: true,
            message: "get cart details Successfully!",
            carts:userCart
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// remove from cart
const removeFromCart = async (req, res) => {
    const userId = req.userId; 
    const id = req.body.id;     

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { _id: id } } },  
            { new: true }
        ).populate('products.product');

        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Removed from your cart",
            carts: updatedCart 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

// updateCart 
const updateCart = async (req, res) => {
    const userId = req.userId; 
    const {id , itemQuantity} = req.body;  

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId, "products._id": id }, 
            { 
                $set: { "products.$.itemQuantity": itemQuantity }
            },
            { new: true }
        ).populate('products.product');
        if (!updatedCart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "updated your cart",
            carts: updatedCart 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

// get wishlist
const getWishlist = async (req, res) => {
    const userId = req.userId;
    try {
        const userWishlist = await Wishlist.findOne({ user: userId }).populate('products.product')
        res.status(200).json({
            success: true,
            message: "get cart details Successfully!",
            wishlists:userWishlist
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// add to wishlist
const addToWishlist = async (req, res) => {
    const userId = req.userId;
    const { pId } = req.body

    try {
        const userWishlist = await Wishlist.findOne({ user: userId })
        if (userWishlist) {
            userWishlist.products.push({
                product: pId
            })
            await userWishlist.save()
        } else {
            await Wishlist.create({
                user: userId,
                products: [{ product: pId }],
            });
        }

        res.status(200).json({
            success: true,
            message: "Added to your wishlist"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// remove from wishlist
const removeFromWishlist = async (req, res) => {
    const userId = req.userId; 
    const id = req.body.id;  

    try {
        const updateWishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { _id: id } } },  
            { new: true }
        ).populate('products.product');
        if (!updateWishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Removed from your Wishlist",
            wishlists: updateWishlist 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export { getUser, updateUser ,getCart, addToCart, removeFromCart , updateCart, getWishlist, addToWishlist, removeFromWishlist }