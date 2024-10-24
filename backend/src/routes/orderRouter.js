import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addOrder ,getOrder , getFarmerOrderProduct, updateOrder} from "../controllers/orderController.js";

const router = express.Router()

// add order
router.post('/addOrder',authMiddleware , addOrder)

// get customer orders
router.get('/getOrder',authMiddleware , getOrder)

// get Farmer Order Product 
router.get('/getFarmerOrderProduct',authMiddleware , getFarmerOrderProduct)

// update order
router.put('/updateOrder',authMiddleware , updateOrder)


export default router