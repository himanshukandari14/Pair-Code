import mongoose from "mongoose"

import {ENV} from "./env.js"


export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Connected to database", conn.connection.hostt);
    }catch(error){
        console.log("Error while connexting to db",error);
        process.exit(1);
    }
    
}