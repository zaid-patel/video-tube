import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { publishAVideo } from '../api/videos';
import Input from './input';
import Button from './button';

const VideoForm = ({ video }) => {
    const [dbVideo, setDbVideo] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            title: video?.title || "",
            description: video?.description || "",
        }
    });

    const submit = async (data) => {
        if (!video) {
            try {
                const res = await publishAVideo(data);
                console.log(res);
                if (res?._id) {
                    navigate(`/video/${res._id}`); // Use res._id instead of dbVideo._id
                }
            } catch (error) {
                console.log(error.message);
            }
        } else {
            console.log("work req || todo");
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-800 p-4 rounded-lg">

            <div className="w-2/3 px-2">
                <Input
                    label="Title:"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Description:"
                    placeholder="Add description for your video"
                    className="mb-4"
                    {...register("description")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Thumbnail:"
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

                <div className='w-full px-2'>
                    <Input
                        label="Video file:"
                        type="file"
                        className="mb-4"
                        placeholder="Upload your video here"
                        accept="video/mp4"
                        {...register("videoFile", { required: !video })}
                    />
                </div>

                <Button
                    type="submit"
                    bgColor={video ? "bg-green-500" : "bg-gold-600"}
                    className="w-full text-white hover:text-black transition-colors duration-300"
                >
                    {video ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};


export default VideoForm;