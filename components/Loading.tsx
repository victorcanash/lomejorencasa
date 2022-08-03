import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {

  return (
    <div 
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        zIndex: '10000',
        width: '100vw', 
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        display:'flex', 
        placeContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <CircularProgress 
        size='60px' 
        sx={{
          color: 'primary.main'
        }}
        
      />
    </div>
  );
};
