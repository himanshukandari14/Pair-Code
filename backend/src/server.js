import express from "express"
import { ENV } from "./lib/env.js";



const app = express();

const PORT=ENV.PORT;


app.get("/",(req,res)=>{
    res.send("hellos");
})

app.listen(PORT,()=>{console.log(`app is runnning on ${PORT}`)})