import mongoose from "mongoose";

const connectDB = async () => {
    try{    
        const conn = await mongoose.connect(process.env.MONGO)
        console.log("MongoDB Connected")
    }catch(error){
        console.log("Error while trying to connect to mongo", error)
        process.exit(1)
    }
}

export default connectDB;