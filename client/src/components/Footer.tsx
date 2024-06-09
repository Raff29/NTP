import { useMediaQuery } from "@mui/material";
import { Box, Grid, Link, Typography, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { grey } from "@mui/material/colors";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{ position: "relative", bottom: 0, width: "100%", bgcolor: "#212121" }}
    >
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <Stack direction={matches ? "column" : "row"} spacing={2}>
              <Link color={grey[50]} underline="none" href="/">
                {" "}
                Process
              </Link>
              <Link color={grey[50]} underline="none" href="/">
                {" "}
                About
              </Link>
              <Link color={grey[50]} underline="none" href="/">
                {" "}
                Contact
              </Link>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          <IconButton aria-label="Facebook" href="/" className="invert">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="Instagram" href="/" className="invert">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="Twitter" href="/" className="invert">
            <TwitterIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" sx={{ p: 1, color: grey[50] }}>
        &copy; {new Date().getFullYear()} Your Website
      </Typography>
    </Box>
  );
};

export default Footer;
