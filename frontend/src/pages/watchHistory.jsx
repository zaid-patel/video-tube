import React, { useEffect, useState } from 'react'
import Videos from '../components/Videos'
import { getUserWatchHistory } from '../api/videos'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import authSlice from '../store/authSlice'
import { Stack,Box,Typography } from '@mui/material'
const WatchHistory = () => {
  const userId=useSelector((state)=>state.auth.userData._id)
  const [videos,setVideos]=useState()
  useEffect(()=>{
    const fetchData=async()=>{
    try {
        const res=await getUserWatchHistory(userId)
        setVideos(res[0].watchHistory)

    } catch (error) {
      console.log(error.message)
      // setError(error.message)
    } 

  }
  fetchData()
  },[userId])
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
           <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>
{        console.log(videos)
}
        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  )
}

export default WatchHistory
