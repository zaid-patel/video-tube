import axios from "axios"


const getAllvideos=async({query,userId})=>{
    let videos,error
    // console.log(userId)
    await axios.get(`/api/v1/videos/all?query=${query}&userId=${userId}`)
    .then((response)=>{
        // console.log(response.data.data)
      videos=response.data.data
    })
    .catch((err)=>{
        error=err.message
        console.log(err.message)
        return error
    })
    return videos
}


const getAvideo=async({videoId})=>{
   let video,error

   await axios.get(`/api/v1/videos/getAvideo/${videoId}`)
   .then((res)=>{
     video=res.data.data
    //  console.log(res)
   })
   .catch((err)=>{
     error=err.message
     console.log(error)
     return error
   })

   return video 
}

const publishAVideo=async(data)=>{
    // console.log(data)
    let video
    await axios.post('/api/v1/videos/publishVideo',{
        ...data,
        thumbnail:data.thumbnail[0],
        videoFile:data.videoFile[0],

    },{
        headers: {
            'Content-Type': 'multipart/form-data'  // Important header for file uploads
          }
    })
    .then((res)=>{
      video=res.data.data
     //  console.log(res)
    })
    .catch((err)=>{
      const error=err.message
      console.log(error)
      return error
    })
 
    return video
}

const getUserWatchHistory=async(userId)=>{
    let videos;
    // console.log(userId);
    try {
        const res=await axios.get(`api/v1/users/c/${userId}/watchhistory`)
        videos=res.data.data
        // console.log(videos)
        return videos
    } catch (error) {
        console.log(error.message)
        return error.message
    }
}

const toggleSubscription=async(userId,channel_id)=>{
 try {
    const res=await axios.post('/api/v1/subscription/toggleSubsription',{
        subscriber:userId,
        channel:channel_id,
    })
    // console.log(res)
    return res?.status
 } catch (error) {
    // console.log(error.message);
    return error.message
 }
}

const getAllSubscribedChannelVideos=async(userId)=>{
    let subscriptions;
    let videos=[];
    videos=await axios.get(`/api/v1/subscription/allSubscribedChannelsVideos/${userId}`)
    // .then((res1)=>{
    //     console.log(res1.data.data)

    //     subscriptions=res1.data.data
    //     return res1.data.data
    // })
    // .then(async()=>{
        
    //     console.log(subscriptions)
    //     for (const subscription of subscriptions) {
    //         console.log(subscriptions)
    //         await axios.get(`/api/v1/videos/all?userId=${userId=subscription.channel}`)
    //         .then((response)=>{
    //             console.log(response.data.data)
    //            videos.concat(response.data.data)
               

    //         })
    //         .catch((err)=>{
    //             const error=err.message
    //             console.log(err.message)
    //             return error
    //         })
           
            
        // }
        // console.log(videos)
        // return videos
    // })
   
    // console.log(videos)
    return videos
}

const getVideoComments=async(videoId)=>{
   try {
      const res=await axios.get(`/api/v1/videos/${videoId}/comments/all?video_id=${videoId}`)
    //   console.log(res)
      return res.data?.data
   } catch (error) {
    //   console.log(error)
      return error.message
   }
}


const addComment=async(videoId,content)=>{
    try {
       const res=await axios.post(`/api/v1/videos/${videoId}/comments/add`,
    {
        videoId,
        content,  
    })
     //   console.log(res)
       return res.data?.data
    } catch (error) {
     //   console.log(error)
       return error.message
    }
 }


 const deleteVideo=async(videoId)=>{
     try {
        const video_id=videoId;
        const res=await axios.delete(`/api/v1/videos/${video_id}`);
        // console.log(res);
        if(res.status==200) return true
        return false;
        
     } catch (error) {
        console.log(error.message);
        
     }
 }

export {
    getAllvideos,
    getAvideo,
    publishAVideo,
    getUserWatchHistory,
    toggleSubscription,
    getAllSubscribedChannelVideos,
    getVideoComments,
    addComment,
    deleteVideo,
}