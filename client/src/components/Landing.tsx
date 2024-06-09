import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Hero = styled(Box)(({ theme }) => ({
  background: 'url("https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4") no-repeat center center',
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(8, 0),
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

const ContentBox = styled(Box)({
  textAlign: 'center',
  zIndex: 2,
});

const Landing: React.FC = () => {
  const theme = useTheme();

  return (
    <Hero>
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
    </Hero>
  );
};

export default Landing;
