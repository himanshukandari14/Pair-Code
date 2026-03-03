import express from "express"
import path from "path"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express"
import { inngest } from "./lib/inngest.ts";


const app = express();

const __dirname = path.resolve()

app.use(express.json())

app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))


const PORT=ENV.PORT;


app.use("/api/inngest",serve({ client: inngest, functions}));


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