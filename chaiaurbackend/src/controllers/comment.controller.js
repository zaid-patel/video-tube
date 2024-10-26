import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApirError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose"



const getVideoComments=asyncHandler(async (req,res)=>{
    const {video_id}=req.query
    // console.log(req.body)
    const {page = 1, limit = 10} = req.query
    if(!video_id) throw new ApiError(400,"video_id is req.")

    const comments=await Comment.aggregate(
        [
           {
             $match:{
                video:new mongoose.Types.ObjectId(video_id)
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
           
        ]
    )
     console.log(comments)
    return res.status(200).json(
       new ApiResponse(200,comments,"comments retrieved succ.")
    )

})


const addComment=asyncHandler(async(req,res)=>{
    // video id from params ,and owner is req.user 
    // const {video_id}=req.params
    const {content,videoId}=req.body
    console.log(content)
    // console.log(req.params)
    if(!content || !videoId) throw new ApiError(400,"all fields are neccessary")
    const owner_id=req.user._id 
    // const onwer=await User.findById(owner_id)

    const video=await Video.findById(videoId)

    if(!video) throw new ApiError(400,"no video with the id provided found")

    const comment=await Comment.create(
        {
            content,
            video:videoId,
            owner:owner_id, 
        }
    )

    if(!comment) throw new ApiError(500,"internal server err")

    return res.status(200).json(
        new ApiResponse(200,comment,"comment added succ.")
    )
})




const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment

    const {_id,newContent}=req.body

    if(!_id || !newContent){
        throw new ApiError(400,"No comment id(_id) or newContent found")

    }
    try {
        
        const newComment=await Comment.findByIdAndUpdate(_id,{
            $set:{
                content:newContent
            }
        },{new:true})

        return res.status(200).json(new ApiResponse(200,newComment,"comment updated succ."))
    } catch (error) {
         throw new ApiError(500,error.message)
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {_id}=req.body

    if(!_id){
        throw new ApiError(400,"No comment id(_id) ")

    }
    try {
        
        const res=await Comment.findByIdAndDelete(_id)

        return res.status(200).json(new ApiResponse(200,res,"comment deleted succ."))
    } catch (error) {
         throw new ApiError(500,error.message)
    }
})



export {
    addComment,
    getVideoComments,
    updateComment,
    deleteComment,
}