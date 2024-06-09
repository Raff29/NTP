import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface LoaderSpinnerProps {
  loading: boolean;
  size?: number;  
}

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({ loading, size = 40 }: LoaderSpinnerProps) => {
  const theme = useTheme();

  if (!loading) {
    return null; 
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}> 
      <CircularProgress sx={{ color: theme.palette.primary.main }} size={size} />
    </Box>
  );
};

export default LoaderSpinner;
