import mongoose from "mongoose"
import { Video } from "../models/video.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApirError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"






     const getAllVideos = asyncHandler(async (req, res) => {
        ///  userid->get all videos of that channel
        // query ->title/channel name me dhundega 
       const { page = 1, limit = 10, query, userId } = req.query


       if(!userId && !query){
         throw new ApiError(400,"User id or query required")
       }
    //    console.log(query)
       let videos
      try {
        
        //  console.log(query + userId);
         
         if(query=="homepage")
         videos=await Video.find({title:{$regex:"",$options:"i"}}).limit(limit).skip((page-1)*limit)

         else if(userId){
            // console.log(123)
          videos=await Video.find({owner:userId})
        // console.log(1234) 
        }
         else {
            videos=await Video.find({title:{$regex:query,$options:"i"}}).limit(limit).skip((page-1)*limit)

         }

        //  console.log(videos+"1234")
         return res.status(200).json(
            new ApiResponse(200,videos,"videos fetched successfully")
         )

      } catch (error) {
        throw new ApiError(500,error.message)
      }



       
    })
// multer middleware 
   
    
    const publishAVideo = asyncHandler(async (req, res) => {
        try {
        // take data from frontend and video and thumbnail
        // upload video and thumbnail on cloudinary 
        // make a video model object ,add onwer ,duration, etc 
        // return teh video 
    
    
        const { title, description} = req.body
        // const owner=await User.findById(req.user._id)
    //    console.log(req.files)
    
        const videoFileLocalPath = req.files?.videoFile[0]?.path;
        const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
    
        if(!videoFileLocalPath || !thumbnailLocalPath){
            throw new ApiError(407,"video and thumbnail are required")
        }
    
        const videoFile=await uploadOnCloudinary(videoFileLocalPath)
        const thumbnail=await uploadOnCloudinary(thumbnailLocalPath)
    
        if(!videoFile  || !thumbnail){
            throw new ApiError(500,"internal server error | cloudinary upload error")
        }
    //   try
        const video=await Video.create(
            {
                videoFile:videoFile.url,
                thumbnail:thumbnail.url,
                owner:req.user._id,
                title,
                description,
                duration:videoFile.duration,
                
            }
        )
    
        if(!video) throw new ApiError(500,"internal server error while adding  video to db")
    
    
        // just to confirm that video was addded properly 
        const createdVideo = await Video.findById(video._id)
    
        if(!createdVideo) throw new ApiError(500,"internal server error | cant find the video")
    
        return res.status(200).json(
            new ApiResponse(200,createdVideo,"video added successfully!")
        )
    
    
    } catch (error) {
        console.log(error.message)
    }
    
    })


   const getAvideo=asyncHandler(async(req,res)=>{
    
      const {videoId}=req.params;
    //   const video_id=videoId 
      console.log(req.params.videoId)
      if(!videoId) throw new ApiError(400,"video id is required")
      await Video.findByIdAndUpdate(videoId,{
        $inc:{views:1}
      })
      const user=await User.findById(req.user?._id)
      if(user && !user. watchHistory?.includes(videoId)){
         user.watchHistory.push(videoId)
         await user.save()
      }
      
      const video= await Video.aggregate([
          {
            $match:{
                _id:new mongoose.Types.ObjectId(videoId)
            }
          },
          
          {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner", 
                pipeline:[
                    {
                        $project:{
                            username:1,
                            avatar:1,
                        }
                    }
                ]
            }
          },
          {
            
            $set:
            {
            owner:{
                    $first:"$owner",
                }
            }
          }
         
      ])
      
      if(!video) throw new ApiError(404,"No video with id found")
      console.log(123)
     console.log(video)
     
        res.status(200).json(
            new ApiResponse(200,video,"video fetched succ.")
        )

   })
    

   const deleteVideo=asyncHandler(async(req,res)=>{
     const {video_id}=req.params;
     console.log(video_id);
     const video=await Video.findById(video_id)
     if(!video) throw new ApiError(400,"video with given id not found")
     const res1=await Video.findByIdAndDelete(video_id)
    const res2=await Video.findById(video_id)
     console.log(res2+" worr");
      res.status(200).json(new ApiResponse(200,res2,"succ."));
     
   })



export {
    publishAVideo,
    getAvideo,
    getAllVideos,
    deleteVideo
}