import mongoose from 'mongoose'

const PaymentSchema = new  mongoose.Schema({
      orderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ['Cash on Delivery', 'Online Payment'],
        required: true,
      },
      paymentDate: {
        type: Date,
        default: Date.now,
      },
})

const Payment = mongoose.model('Payment',PaymentSchema)

export default Payment



