import { useMediaQuery, useTheme } from "@mui/material";
import { Box, Grid, Link, Typography, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        bgcolor: theme.palette.grey[900], // Set to a dark grey color
        color: theme.palette.common.white, // Set text color to white
        boxShadow: theme.shadows[1],
        padding: theme.spacing(2, 0),
      }}
    >
      <Grid container sx={{ padding: theme.spacing(2) }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <Stack direction={matches ? "column" : "row"} spacing={2}>
              <Link color="inherit" underline="none" href="/">
                Process
              </Link>
              <Link color="inherit" underline="none" href="/">
                About
              </Link>
              <Link color="inherit" underline="none" href="/">
                Contact
              </Link>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          <IconButton aria-label="Facebook" href="/" sx={{ color: theme.palette.common.white }}>
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Instagram" href="/" sx={{ color: theme.palette.common.white }}>
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="Twitter" href="/" sx={{ color: theme.palette.common.white }}>
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
