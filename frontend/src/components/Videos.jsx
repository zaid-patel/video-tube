/* eslint-disable no-unused-vars */
import React from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';

function Videos({ direction, videos }) {
  return (
    <Stack
      direction={direction || 'row'}
      flexWrap="wrap"
      alignItems="start"
      gap={2}
      sx={{
        backgroundColor: '#000', // Black background
        padding: 2, // Padding around the stack
        borderRadius: 2, // Rounded corners
      }}
    >
      {videos?.map((video) => (
        <Box
          key={video._id}
          sx={{
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'scale(1.05)', // Scale effect on hover
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.5)', // Golden shadow on hover
            },
          }}
        >
          <VideoCard video={video} />
        </Box>
      ))}
    </Stack>
  );
}

export default Videos;