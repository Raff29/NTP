import { useMediaQuery } from '@mui/material';
import {
  Box,
  Grid,
  Link,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
  const matches = useMediaQuery('(max-width: 600px)');

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', bgcolor: '#f5f5f5' }}>
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
          <img src="/logo.svg" alt="Logo" className="w-16 h-16 md:w-24 md:h-24"/>  
            <Stack direction={matches ? 'column' : 'row'} spacing={2}>
              {/* Links */}
              <Link underline="none" href="/"> Process</Link>
              <Link underline="none" href="/"> About</Link>
              <Link underline="none" href="/"> Contact</Link>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          <IconButton aria-label="Facebook" href="/">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Instagram" href="/">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="Twitter" href="/">
            <TwitterIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" sx={{ p: 1 }}>
        &copy; {new Date().getFullYear()} Your Website
      </Typography>
    </Box>
  );
};

export default Footer;
