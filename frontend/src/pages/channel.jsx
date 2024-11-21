import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Box } from '@mui/material';
import Videos from '../components/Videos';
import { getAllvideos } from '../api/videos';

const Channel = () => {

  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userId);
        const res = await getAllvideos({ userId });
        setVideos(res);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };


    fetchData();
  }, [userId]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box
        sx={{
          height: { sx: 'auto', md: '92vh' },
          borderRight: '1px solid #3d3d3d',
          px: { sx: 0, md: 2 },
          bgcolor: 'gray.800', // Dark background for sidebar
        }}
      >
        {/* Sidebar can be added here */}
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: '#fff' }}
        >
          Copyright © 2024 VideoTube
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
          <span style={{ color: 'black' }}>VIDEOS</span>
        </Typography>


        {error ? (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        ) : (
          videos.length > 0 ? (
            <Videos videos={videos} />
          ) : (
            <Typography variant="body1" sx={{ color: 'white', mt: 2 }}>
              No videos found for this channel.
            </Typography>
          )
        )}

      </Box>
    </Stack>
  );
};

export default Channel;