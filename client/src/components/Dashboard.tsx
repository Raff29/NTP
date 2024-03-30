import { FC } from "react";
import { Container, Paper, Typography } from '@mui/material';
import FileViewer from './FileViewer';
import FileUploader from "./FileUploader";

const Dashboard: FC = () => {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85vh', padding: '8', backgroundColor: 'gray.100' }}>
      <Paper className="w-full max-w-2xl p-8 text-center">
        <Typography variant='h4' gutterBottom className="mb-8">Music List</Typography>
        <FileUploader />
        <FileViewer />
      </Paper>
    </Container>
  );
};

export default Dashboard;