import { useMediaQuery } from "@mui/material";
import { Box, Grid, Link, Typography, IconButton, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import React from "react";
import { grey } from "@mui/material/colors";

const Footer: React.FC = () => {
  const matches = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        position: "relative",
        bottom: 0,
        width: "100%",
        bgcolor: "#212121",
      }}
    >
      <Grid container sx={{ padding: 2 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <Stack
              direction={matches ? "column" : "row"}
              spacing={2}
              alignItems={matches ? "center" : "flex-start"}
              justifyContent={matches ? "center" : "flex-start"}
            >
              <Link
                color={grey[50]}
                underline="none"
                href="/"
                sx={{
                  "&:hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                Process
              </Link>
              <Link
                color={grey[50]}
                underline="none"
                href="/"
                sx={{
                  "&:hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                About
              </Link>
              <Link
                color={grey[50]}
                underline="none"
                href="/"
                sx={{
                  "&:hover": {
                    color: "secondary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                Contact
              </Link>
            </Stack>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
        >
          <IconButton
            aria-label="Facebook"
            href="/"
            sx={{ color: grey[50], "&:hover": { color: "secondary.main" } }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            aria-label="Instagram"
            href="/"
            sx={{ color: grey[50], "&:hover": { color: "secondary.main" } }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            href="/"
            sx={{ color: grey[50], "&:hover": { color: "secondary.main" } }}
          >
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
