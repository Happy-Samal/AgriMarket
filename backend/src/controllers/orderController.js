import Order from "../models/Order.js";
import { SMTPClient } from 'emailjs';
import ejs from 'ejs';
import path from "path";
import Payment from '../models/Payment.js'

const sendEmail = async (value) => {
    
    try {

    console.log("create server")
    const server = new SMTPClient({
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        port: 465,
        ssl: true,
    });
    console.log("create server successfully")


    console.log('Current working directory:', process.cwd());
    const orderEmailTemplatePath = path.join(process.cwd(), 'public', 'orderEmail.ejs');
    console.log('Trying to read EJS template from:', orderEmailTemplatePath);

    console.log('Attempting to render the email template...');
        const htmlContent = await ejs.renderFile(orderEmailTemplatePath, {
            username: value.username,
            profileLink: value.profileLink,
            orderId: value.orderId,
            totalAmount: value.totalAmount,
            address: value.address,
            phone: value.phone,
            products: value.products,
            name: value.name
        })
        console.log('Email template rendered successfully.');
        const message = await server.sendAsync({
            from: `AgriMarket Team <${process.env.GMAIL_USER}>`,
            to: `${value.username} <${value.email}>`,
            subject: "Track Your Order",
            attachment: [
                { data: htmlContent, alternative: true }
            ]
        });
        console.log("order email sent successfully")
        return {
            success: true,
            message: 'Email Sent Successfully!',
            sent: true
        }
    } catch (err) {
        console.log("Error in send order email", err)
        return {
            success: false,
            message: "Internal Server Error!",
            sent: false,
        }
    }
}

// add order
const addOrder = async (req, res) => {
    const user = req.userId
    const { totalAmount, products, formInfo } = req.body
    try {
        const orderInfo = await Order.create({
            customer: user,
            products: products,
            totalAmount: totalAmount,
            address: formInfo.address,
            phone: formInfo.phone,
            paymentMethod: formInfo.paymentMethod,
            name: formInfo.username,
            email: formInfo.email
        })

        const paymentInfo = await Payment.create({ amount: totalAmount, orderId: orderInfo._id, paymentMethod: formInfo.paymentMethod })

        const populatedOrder = await Order.findById(orderInfo._id)
            .populate({
                path: 'products.product', // First, populate the product field inside the products array
                populate: {
                    path: 'farmer', // Then populate the farmer field from the Product model
                    model: 'User', // Make sure to reference the User model
                }
            });


        // send email to customer
        const cans = await sendEmail(
            {
                username: populatedOrder.name,
                profileLink: `${process.env.FRONTEND_URL}/customer/profile?id=${user}`,
                orderId: populatedOrder._id,
                totalAmount: populatedOrder.totalAmount,
                address: populatedOrder.address,
                phone: populatedOrder.phone,
                products: populatedOrder.products,
                email: populatedOrder.email,
                name: populatedOrder.name,
            }
        )

        populatedOrder.products.forEach(async (item) => {
            // send email to farmer
            const fans = await sendEmail(
                {
                    username: item.product?.farmer?.username,
                    profileLink: `${process.env.FRONTEND_URL}/farmer/dashboard?id=${item.product?.farmer?._id}`,
                    orderId: populatedOrder._id,
                    totalAmount: item.price,
                    address: populatedOrder.address,
                    phone: populatedOrder.phone,
                    products: [item],
                    email: item.product?.farmer?.email,
                    name: populatedOrder.name,
                }
            )
        })


        return res.status(200).json({
            success: true,
            message: "Order Successfully Placed."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// get order
const getOrder = async (req, res) => {
    const user = req.userId
    try {
        const orderInfo = await Order.find({ customer: user }).populate('products.product')
        res.status(200).json({
            success: true,
            message: "orderInfo get successfully!",
            orderInfo: orderInfo
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// farmer product order
const getFarmerOrderProduct = async (req, res) => {
    const user = req.userId
    try {
        const orders = await Order.find({}).populate('products.product')
        let products = []
        orders?.forEach(item => {
            item.products?.forEach(p => {
                if (p.product?.farmer == user) {
                    products.push({
                        ...p._doc,
                        orderId: item._id,
                        paymentMethod: item.paymentMethod,
                        orderDate: item.orderDate
                    });
                }
            })
        });
        res.status(200).json({
            success: true,
            message: "order product get successfully!",
            orderProducts: products
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


// Update order
const updateOrder = async (req, res) => {
    const value = req.body;


    let updateFields = {
        "products.$.orderStatus": value.orderStatus
    };

    if (value.deliveryDate) {
        updateFields["products.$.deliveryDate"] = value.deliveryDate;
    }

    try {
        const updatedOrder = await Order.findOneAndUpdate(
            {
                _id: value.orderId,
                "products.product": value.product?._id
            },
            {
                $set: updateFields
            },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order or product not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully!",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};



export { addOrder, getOrder, getFarmerOrderProduct, updateOrder }