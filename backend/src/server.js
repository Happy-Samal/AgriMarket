import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { createServer } from 'node:http';
import { Server } from 'socket.io';


// import routers
import authRouter from './routes/authRouter.js'
import accountRouter from './routes/accountRouter.js'
import helperRouter from './routes/helperRouter.js'
import productRouter from './routes/productRouter.js'
import searchRouter from './routes/searchRouter.js'
import chatRouter from './routes/chatRouter.js'
import orderRouter from './routes/orderRouter.js'
import razorpayRoter from './routes/razorpayRouter.js'

// db connection
import dbConfig from './config/dbConfig.js'
dbConfig()

const app = express()
const port = process.env.PORT || 3000
const server = createServer(app);  // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,PUT,POST,DELETE",
    credentials: true
}));
app.use(bodyParser.json({limit:'10mb'}))
app.use(cookieParser())



// define routes
app.use('/api/auth',authRouter)
app.use('/api/account',accountRouter)
app.use('/api/helper',helperRouter)
app.use('/api/product',productRouter)
app.use('/api/search',searchRouter)
app.use('/api/chat',chatRouter)
app.use('/api/order',orderRouter)
app.use('/api/payment',razorpayRoter)



// default router
app.get('/', (req, res) => {
  res.send('API is running...')
})


// web socket
io.on('connection', (socket) => {
  console.log('users connected');

  let currentUserId = null;

  socket.on('send_status',({id}) =>{
    currentUserId = id
    io.emit('receive_status' , {id:id , isOnline:true})
  })

  socket.on('send_message', ({ sender, content }) => {
    io.emit('receive_message', { sender, content, isSeen:false, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    if (currentUserId) {
      io.emit('receive_status', { id: currentUserId, isOnline: false });
    }
    console.log('user disconnected');
  });
});


server.listen(port, () => {
  console.log(`Example server listening on port http://localhost:${port}`)
})