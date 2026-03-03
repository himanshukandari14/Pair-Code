import express from "express"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";



const app = express();

const PORT=ENV.PORT;


app.get("/",(req,res)=>{
    res.send("hellos");
})

app.listen(PORT,async()=>{

    try{
        await connectDB();
        console.log(`app is runnning on ${PORT}`)

    }catch(error){
        console.log("error while starting the app",error)
    }

})