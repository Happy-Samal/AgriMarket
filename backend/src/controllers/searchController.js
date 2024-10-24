import mongoose from 'mongoose';
import Product from '../models/Product.js';

const search = async (req, res) => {
    const { id, value, minPrice, maxPrice, minDiscount, maxDiscount } = req.body; // Destructure the request body
    try {
        const query = {
            $and: [] // Use $and for more flexible filtering combinations
        };

        // Text search for name and category
        if (value) {
            query.$and.push({
                $or: [
                    { name: { $regex: value, $options: 'i' } },  // Case-insensitive search for name
                    { category: { $regex: value, $options: 'i' } },  // Case-insensitive search for category
                ]
            })
        }
        // Price range filtering if value exists
        if (value && minPrice !== undefined && maxPrice !== undefined) {
            query.$and.push({
                price: {
                    $gte: minPrice,  // Minimum price
                    $lte: maxPrice   // Maximum price
                }
            });
        }

        // Discount range filtering if value exists
        if (value && minDiscount !== undefined && maxDiscount !== undefined) {
            query.$and.push({
                discount: {
                    $gte: minDiscount,  // Minimum discount
                    $lte: maxDiscount   // Maximum discount
                }
            });
        }

        if (mongoose.Types.ObjectId.isValid(id)) {
            query.$and.push({ _id: id });
        }

      
        // Execute the query
        const products = await Product.find(query).populate('farmer');

        res.status(200).json({
            success: true,
            products
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

export default search;
