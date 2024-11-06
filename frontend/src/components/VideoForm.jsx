import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { publishAVideo } from '../api/videos';
import Input from './input';
import Button from './button';

const VideoForm = ({
    video
}) => {
    const [dbVideo,setDbVideo]=useState();
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false);
  const {register,handleSubmit}=useForm({
       defaultValues:{
        title:video?.title || "",
         description:video?.description || "",
       }
  })

  const submit=async(data)=>{
     if(!video){
       try {
        setLoading(true);
         const res=await publishAVideo(data);
         console.log(res)
        //  setDbVideo(res)
        //  console.log(dbVideo)
        setLoading(false);
         if(res?._id) navigate(`/video/${res._id}`)
 
       } catch (error) {
          console.log(error.message)
       }
     }
     else{
        console.log("work req || todo")
     }
     
  }

  return (
    <div> 
   {loading?  <div>Uploading.... | This might take some while</div> :
       <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Description :"
                    placeholder="Add description for ur video"
                    className="mb-4"
                    {...register("description")}
                    
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Thumbnail :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("thumbnail", { required: !video })}
                />
                {video && (
                    <div className="w-full mb-4">
                        <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <div className='w-1/3 px-2'>
                    <Input
                      label="Video file"
                      type="file"
                      className="mb-4"
                      placeholder="upload your video here"
                      accept="video/mp4 "
                      {...register(name="videoFile",{required:!video})}
                    />


                </div>
                {/* <Select  className='w-full mb-4'/> */}
               
                <Button type="submit" bgColor={video ? "bg-green-500" : undefined} className="w-full">
                    {video ? "Update" : "Submit"}
                </Button>
            </div>
        </form>}
</div>
  )
}

export default VideoForm
