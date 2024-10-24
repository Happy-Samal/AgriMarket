import Razorpay from 'razorpay';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';

const createRzyOrder = async (req, res) => {
    const { amount } = req.body
    // Create an instance of Razorpay with the user's credentials
    const instance = new Razorpay({ key_id: process.env.RZY_ID, key_secret: process.env.RZY_SECRET });
    let options = {
        amount: Number(amount) * 100,
        currency: "INR",
    };

    let x = await instance.orders.create(options);
    if (x.id) {
        return res.status(200).json({
            success: true,
            message: "create an instance successfully!",
            id: x.id,
            rzy_id: process.env.RZY_ID
        })
    } else {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

// Razorpay callback URL to verify the payment
const rzyCallBackUrl = async (req, res) => {
    try {
        const { order_id, payment_id, signature } = req.body;

        // Validate payment
        const isValid = validatePaymentVerification(
            {order_id , payment_id},
            signature,
            process.env.RZY_SECRET
        );
        

        if (isValid) {
            // Payment successful, send response
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully!"
            });
        } else {
            // Payment failed verification
            return res.status(400).json({
                success: false,
                message: "Payment verification failed!"
            });
        }
    } catch (error) {
        console.error("Error during payment verification:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        });
    }
}


export { createRzyOrder, rzyCallBackUrl }