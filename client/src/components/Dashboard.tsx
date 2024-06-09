import React from "react";
import { Box, Typography, useTheme, Container } from "@mui/material";
import FileUploader from "./FileUploader";
import FileViewer from "./FileViewer";

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: theme.spacing(2),
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Dashboard
        </Typography>
      </Box>
      <FileUploader />
      <Box sx={{ mt: theme.spacing(4) }}>
        <FileViewer />
      </Box>
    </Container>
  );
};

export default Dashboard;
