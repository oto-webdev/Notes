import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectDb = await mongoose.connect(process.env.MONGO)
        console.log("Connected to DB")
    }catch(error){
        console.log("Error", error)
        process.exit(1)
    }
}

export default connectDB;