import  mongoose from "mongoose" 

export const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_Name}`)
        const connection = mongoose.connection
    
        connection.on("connected", () => {
            console.log("mongoDB connected successfully")
        })
    
        connection.on("error", () => {
            console.log("something went wrong while connecting mongoDb")
        })
    } catch (error) {
        console.log("Something went wrong while connecting mongoDB")
    }

    
}