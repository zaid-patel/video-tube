import { Card, CardContent, Stack,Typography,CardMedia } from '@mui/material'
// import { grey } from '@mui/material/colors'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function VideoCard({video}) {
 
  return (
    <>

    <Card sx={{ width: { xs: '100%', sm: '358px', md: "320px", }, boxShadow: "none", borderRadius: 0 }}>
       {/* {console.log(video)} */}
       <Link to={`/video/${video?._id}` }>
      <CardMedia image={video?.thumbnail} alt="thumbnail" 
        sx={{ width: { xs: '100%', sm: '358px'}, height: 180 }} 
      />
      </Link>
       <CardContent sx={{ backgroundColor: "#1E1E1E", height: '106px' }}>
       <Link to={`/video/${video?._id}` }>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
         {video.title.slice(0,50)}
         </Typography>
        </Link>
        <Link to={`/users/${video?.owner?._id}` }>
        <Typography variant="subtitle2" color="gray">
            {/* {console.log(video)} */}
            {video?.owner?._id}
            </Typography>
        </Link>
       </CardContent>
    
    </Card>
    </>
  )
}

export default VideoCard


