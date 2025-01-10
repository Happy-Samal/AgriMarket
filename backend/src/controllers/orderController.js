import Order from "../models/Order.js";
import { SMTPClient } from 'emailjs';
import ejs from 'ejs';
import path from "path";
import Payment from '../models/Payment.js'

const sendEmail = async (value) => {

    const server = new SMTPClient({
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASSWORD,
        host: 'smtp.gmail.com',
        ssl: true,
    });

    // const orderEmailTemplate = path.join(process.cwd(), 'public', 'orderEmail.ejs');
    const orderEmailTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - AgriMarket</title>
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

        .order-info {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 5px;
            margin-top: 20px;
        }

        .order-info p {
            margin: 5px 0;
            font-size: 14px;
        }

        .order-info .product-list {
            margin-top: 10px;
        }

        .product-item {
            background-color: #fff;
            padding: 10px;
            border-radius: 5px;
            margin: 5px 0;
            border: 1px solid #ddd;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }

        .track-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>AgriMarket</h1>
        </div>
        <div class="content">
            <p>Dear <%= username %>,</p>
            <p>Order successfully! Here are the details of your order:</p>

            <!-- Tracking Button -->
            <a href="<%= profileLink %>" class="track-button">Track Your Order</a>
            
            <!-- Order Info Section -->
            <div class="order-info">
                <p><strong>Order ID:</strong> <%= orderId %></p>
                <p><strong>Customer Name:</strong> <%= name %></p>
                <p><strong>Delivery Address:</strong> <%= address %></p>
                <p><strong>Phone Number:</strong> <%= phone %></p>

                <div class="product-list">
                    <p><strong>Products:</strong></p>
                    <% products.forEach(function(item) { %>
                        <div class="product-item">
                            <p><strong>Name:</strong> <%= item.product.name %></p>
                            <p><strong>Quantity:</strong> <%= item.quantity %></p>
                            <p><strong>Price:</strong> ₹<%= item.price %></p>
                            <p><strong>deliveryDate:</strong> <%= item.deliveryDate %></p>
                            <p><strong>Status:</strong> <%= item.orderStatus %></p>
                        </div>
                    <% }) %>
                </div>

                <p class="content"><strong>Total Amount:</strong> ₹<%= totalAmount %></p>
            </div>
        </div>
        <div class="footer">
            &copy; 2024-25 AgriMarket. All rights reserved.
        </div>
    </div>
</body>
</html>
`;

    try {

        const htmlContent = await ejs.renderFile(orderEmailTemplate, {
            username: value.username,
            profileLink: value.profileLink,
            orderId: value.orderId,
            totalAmount: value.totalAmount,
            address: value.address,
            phone: value.phone,
            products: value.products,
            name: value.name
        })

        const message = await server.sendAsync({
            from: `AgriMarket Team <${process.env.GMAIL_USER}>`,
            to: `${value.username} <${value.email}>`,
            subject: "Track Your Order",
            attachment: [
                { data: htmlContent, alternative: true }
            ]
        });
        return {
            success: true,
            message: 'Email Sent Successfully!',
            sent: true
        }
    } catch (err) {
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
       
        const paymentInfo = await Payment.create({amount:totalAmount , orderId:orderInfo._id , paymentMethod:formInfo.paymentMethod})

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