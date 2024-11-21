import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import Videos from '../components/Videos';
import Search from '../components/search';
import { useSelector } from 'react-redux';
import { getAllSubscribedChannelVideos } from '../api/videos';

const SubscribedChannels = () => {
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const userId = useSelector((state) => state.auth.userData._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllSubscribedChannelVideos(userId);
        setVideos(res.data.data);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row' } }}>
      <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
        <Box p={2} sx={{ overflowY: 'auto', width: '40vw' }}>
          <Search />
        </Box>
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
              No videos found for your subscribed channels.
            </Typography>
          )
        )}
      </Box>
    </Stack>
  );
};

export default SubscribedChannels;