import { Router } from "express";
import { getAllSubscribedChannelVideos, getAllSubscribedChannels, getAllSubscribers, toggleSubscription } from "../controllers/subscription.controller.js";
import { verfiyJwt } from "../middlewares/auth.middleware.js";


const subsRouter=Router()



subsRouter.route("/toggleSubsription").post(
    verfiyJwt,
    toggleSubscription)

subsRouter.route("/subscribers/:userId").get(
   verfiyJwt,
   getAllSubscribers,   
)


subsRouter.route("/subscriptions/:userId").get(
    verfiyJwt,
    getAllSubscribedChannels,   
 )


 subsRouter.route("/allSubscribedChannelsVideos/:userId").get(
    verfiyJwt,
    getAllSubscribedChannelVideos,   
 )
export {subsRouter}