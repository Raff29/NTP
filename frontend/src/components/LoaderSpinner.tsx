import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import React from 'react';

interface LoaderSpinnerProps {
  loading: boolean;
  size?: number;  
}

const LoaderSpinner = ({ loading, size = 40 }: LoaderSpinnerProps) => {
  if (!loading) {
    return null; 
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}> 
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoaderSpinner;
