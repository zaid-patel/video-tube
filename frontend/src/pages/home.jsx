import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { getAllvideos } from '../api/videos'
import { Stack,Typography,Box } from '@mui/material'
import Videos from '../components/Videos'
import { useParams } from 'react-router-dom'
import Search from '../components/search'


const Home = () => {
  const [error,setError]=useState()
  const [videos,setVideos]=useState()
  const {query}=useParams() 
  // console.log(query)
  useEffect(()=>{
    // console.log(12)
    const fetchData=async()=>{
    try {
      
        // if(query=="ok") console.log(123)
        const res=await getAllvideos({query:query?query : "homepage"})
        setVideos(res)

    } catch (error) {
      console.log(error.message)
      setError(error.message)
    } 

  }
  // console.log(123)

  fetchData()
  },[query])
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

        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  );
}

export default Home
