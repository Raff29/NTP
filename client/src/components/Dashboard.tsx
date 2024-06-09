import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FileUploader from "./FileUploader";
import FileViewer from "./FileViewer";

const Dashboard: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "75vh",
        padding: theme.spacing(4),
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Dashboard
      </Typography>
      <Box>
        <FileUploader />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <FileViewer />
      </Box>
    </Box>
  );
};

export default Dashboard;
