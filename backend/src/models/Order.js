import mongoose from 'mongoose'

const OrderSchema = new  mongoose.Schema({
      customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
          price: {
            type: Number,
            required: true,
          },
          deliveryDate: {
            type: String,
            default:"Expected in 7 days"
          },
          orderStatus: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
          },
        }
      ],
      totalAmount: {
        type: Number,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ['Cash on Delivery', 'Online Payment'],
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      name:{
        type: String,
        required:true
      },
      email:{
        type: String,
        required:true
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
})

const Order = mongoose.model('Order',OrderSchema)

export default Order



