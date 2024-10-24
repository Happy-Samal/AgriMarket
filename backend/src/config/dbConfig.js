import mongoose from 'mongoose'

const dbConfig = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("data base connected")
    }catch(err){
        console.error("error in connect to db : ",err)
    }
}

export default dbConfig