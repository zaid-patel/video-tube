/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
import { getAllvideos } from '../api/videos';
import { useParams } from 'react-router-dom';
import Videos from '../components/Videos';
import Search from '../components/search';

const Home = () => {

  const [error, setError] = useState();
  const [videos, setVideos] = useState();
  const { query } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllvideos({ query: query ? query : 'homepage' });
        setVideos(res);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      }
    };
    fetchData();
  }, [query]);

  return (
    <Stack
      sx={{
        flexDirection: { sx: 'column', md: 'row' },
        backgroundColor: '#121212', // Black background
        minHeight: '100vh',
        color: '#d4af37', // Gold text
      }}
    >
      <Box
        p={2}
        sx={{
          overflowY: 'auto',
          height: '90vh',
          flex: 2,
        }}
      >
        <Box
          p={2}
          sx={{
            overflowY: 'auto',
            width: '40vw',
            backgroundColor: '#1e1e1e', // Dark grey for search box container
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Search />
        </Box>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{
            color: '#f0f0f0', // Light grey for main title
            marginTop: '1rem',
          }}
        >
          <span style={{ color: '#FFD700' }}>VIDEOS</span>
        </Typography>

        {videos && <Videos videos={videos} />}
      </Box>
    </Stack>
  );
};

export default Home;
