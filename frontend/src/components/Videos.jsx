import React from 'react'
import { Stack,Box } from '@mui/material'
import VideoCard from './VideoCard'
function Videos({
    direction,
    videos,
}) {
  
  return (
     <Stack direction={direction || "row"} flexWrap="wrap"  alignItems="start" gap={2}>
       {
        
        videos?.map((video,idx)=>(
           
            <Box key={video._id}>
                 {/* {console.log(video)} */}
                <VideoCard  video={video} />
                {/* {         console.log(video)  } */}
                {/* {console.log(1)} */}
            </Box>
        ))
       }
           
     </Stack>
  )
}

export default Videos
