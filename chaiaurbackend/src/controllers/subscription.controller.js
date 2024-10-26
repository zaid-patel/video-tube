import mongoose from "mongoose";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApirError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";

const getAllSubscribers=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    console.log(userId)
    if(!userId) throw new ApiError(400,"userid req")

    const subs=await Subscription.find({channel:userId})

    if(!subs) throw new ApiError(400,"internal servver error")
    console.log(subs)
    return res.status(200).json(new ApiResponse(200,subs,"all subs fetched"))

})



const getAllSubscribedChannels=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    if(!userId) throw new ApiError(400,"userid req")

    const data=await Subscription.find({subscriber:userId})


    if(!data) throw new ApiError(400,"internal servver error")
    console.log(data)
    return res.status(200).json(new ApiResponse(200,data,"all subs fetched"))

})


const toggleSubscription=asyncHandler(async(req,res)=>{
    const {subscriber,channel}=req.body
    const data=await Subscription.findOne({subscriber,channel})
    console.log(data)
    if(data){
        console.log(data)
        await Subscription.deleteOne(data._id)

        return res.status(200).json(new ApiResponse(200,{},"subs removed"))
    }

    const subscriberUser=await User.findById(subscriber)
    const channelUser=await User.findById(channel)
    if(subscriber==channel) throw new ApiError(400,"channel and subscriber same")

   console.log(channelUser,subscriberUser)
    if(!channelUser || !subscriberUser){
        throw new ApiError(400,"no chaannel user or subscriber user found")
    }
    const newData=await Subscription.create(
        {
            subscriber,
            channel,  
        }
    )
    if(!newData) throw new ApiError(500,"internal server error")

    return res.status(200).json(new ApiResponse(200,newData,"subscription added"))

    
})



const getAllSubscribedChannelVideos=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    if(!userId) throw new ApiError(400,"userid req")

    const data=await Subscription.find({subscriber:userId})


    console.log(data);
     let videos=[];
    for (const subscription of data) {
        console.log(subscription.channel);
        await Video.find({owner:subscription.channel})
        .then((userVideo)=>
        {
            console.log(userVideo)
           videos=videos.concat(userVideo)
            console.log(videos)
        }
    
    )
        
    }

    console.log(videos);
    return res.status(200).json(new ApiResponse(200,videos,"videos fetchd suc."))

})






export {
    getAllSubscribedChannels,
    getAllSubscribers,
    toggleSubscription,
    getAllSubscribedChannelVideos,
}