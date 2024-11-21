import { Card, CardContent, Stack, Typography, CardMedia } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '358px', md: '320px' },
        boxShadow: 'none',
        borderRadius: '10px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)', // Slightly enlarge on hover
          boxShadow: '0 4px 20px rgba(255, 215, 0, 0.5)', // Golden shadow on hover
        },
      }}
    >
      <Link to={`/video/${video?._id}`}>
        <CardMedia
          image={video?.thumbnail}
          alt="thumbnail"
          sx={{
            width: '100%',
            height: 180,
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
        />

      </Link>
      <CardContent sx={{ backgroundColor: '#1E1E1E', height: '106px' }}>
        <Link to={`/video/${video?._id}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
            {video.title.length > 50 ? `${video.title.slice(0, 50)}...` : video.title}
          </Typography>
        </Link>
        <Link to={`/users/${video?.owner?._id}`}>
          <Typography variant="subtitle2" color="gray">
            {video?.owner?.username || video?.owner?._id}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
}

export default VideoCard;