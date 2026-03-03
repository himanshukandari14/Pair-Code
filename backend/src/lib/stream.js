import {StreamChat} from 'stream-chat'
import { ENV } from "./env.js"

const apiKey= ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if (!apiKey || !apiSecret){
    console.log("STREAM_API_KEY or SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData)=>{
    try {
        await chatClient.upsertUser(userData)
        console.log("stream user upserted sucessfully",userData)
    } catch (error) {
        console.log(error,"ERROR upserting stream user")
    }
}

export const deleteStreamUser = async(userId)=>{
    try {
        await chatClient.deleteUser(userId)
        console.log("Stream user deleted successfully")
    } catch (error) {
        console.log(error,"ERROR upserting stream user")
    }
}

