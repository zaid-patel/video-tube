import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getAllvideos } from '../api/videos'
import { Stack,Typography,Box } from '@mui/material'
import Videos from '../components/Videos'
import { useParams } from 'react-router-dom'
import Search from '../components/search'
import { getAllSubscribedChannelVideos } from '../api/videos'
import { useSelector } from 'react-redux'


const SubscribedChannels= () => {
  const [error,setError]=useState()
  const [videos,setVideos]=useState()
  const userId=useSelector((state)=>state.auth.userData._id)
  // console.log(query)
  useEffect(()=>{
    // console.log(12)
    const fetchData=async()=>{
    try {
        const res=await getAllSubscribedChannelVideos(userId)
        setVideos(res.data.data)

    } catch (error) {
      console.log(error.message)
      setError(error.message)
    } 

  }
  // console.log(123)

  fetchData()
  },[])
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      
      {/* <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> 
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2024 VideoTube
        </Typography>
      </Box>
       */}

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Box p={2} sx={{ overflowY: "auto", width:"40vw" }}>
          < Search />
        </Box>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
           <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
{        console.log(videos)
}
        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  );
}

export default SubscribedChannels
