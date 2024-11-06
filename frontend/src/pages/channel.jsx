import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { Stack,Typography,Box } from '@mui/material'
import Videos from '../components/Videos'
import { getAllvideos } from '../api/videos'
const Channel = () => {
  const [error,setError]=useState()
  const [videos,setVideos]=useState()
  const {userId}=useParams()
  useEffect(()=>{
    
    const fetchData=async()=>{
    try {
      // console.log(userId)
        const res=await getAllvideos({userId})
        // console.log(res);
        
        setVideos(res)

    } catch (err) {
      console.log(err.message)
      setError(err.message)
    } 

  }
  fetchData()
},[])
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box sx={{ height: { sx: "auto", md: "92vh" }, borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
        {/* <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} /> */}
        
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
          Copyright © 2024 VideoTube
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
           <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  );
}

export default Channel
