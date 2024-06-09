import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const ContentBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  zIndex: 2,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(20),
}));

const Landing: React.FC = () => {
  const theme = useTheme();

  return (
      <Container>
        <ContentBox>
          <Typography variant="h2" component="h1" gutterBottom>
            Transform Your Sheet Music
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Upload. Translate. Play.
          </Typography>
          <Typography variant="body1" component="p" style={{ marginTop: '20px', maxWidth: '600px', margin: '0 auto' }}>
            Our app allows you to effortlessly upload your XML sheet music files and convert them into easy-to-read, playable instructions. Perfect for piano enthusiasts!
          </Typography>
          <Button
            sx={{
              marginTop: theme.spacing(4),
              padding: theme.spacing(1, 4),
              fontSize: '1.2rem',
              backgroundColor: theme.palette.secondary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.secondary.dark,
              },
            }}
            component={Link}
            to="/register"
          >
            Register Now
          </Button>
        </ContentBox>
      </Container>
  );
};

export default Landing;
