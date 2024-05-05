import mongoose from "mongoose";

const DB_NAME = "codedamn"

const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected!! DB HOST: ${con.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection FAILD: ",error)
        process.exit(1)
    }
}

export default connectDB