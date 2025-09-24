import React from 'react';
import { Box } from '@mui/material';
import Logo from './Logo'; // Используем новый компонент

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#0a0a0a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Logo width={150} height={150} />
    </Box>
  );
}

export default LoadingScreen;