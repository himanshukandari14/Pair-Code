import express from "express"
import path from "path"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express"
import { inngest, functions } from "./lib/inngest.js";
import cors from "cors"
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(express.json())
app.use(clerkMiddleware())

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))


const PORT=ENV.PORT;


app.use("/api/inngest",serve({ client: inngest, functions}));

app.use("/api/chat", chatRoutes)

app.get("/",(req,res)=>{
    res.send("hellos");
})

app.get('/protected',protectRoute,(req,res)=>{
    return res.send("message it is prtected")
})

app.listen(PORT,async()=>{

    try{
        await connectDB();
        console.log(`app is runnning on ${PORT}`)

    }catch(error){
        console.log("error while starting the app",error)
    }

})