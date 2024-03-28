import { List, ListItemText, ListItemSecondaryAction, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ListItemButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';


interface FileData {
  filename: string;
  instructions: string;
}

const FileViewer: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const mockData: FileData[] = [
      { filename: 'file1', instructions: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, maxime! Doloribus quasi voluptate facilis dicta consequuntur, iusto odit cumque quidem rerum ad. Cupiditate, fugit iste impedit atque velit torem ipsum dolor sit amet consectetur adipisicing elit. Esse, maxime! Doloribus quasi voluptate facilis dicta consequuntur, iusto odit cumque quidem rerum ad. Cupiditate, fugit iste impedit atque velit tenetur est!' },
      { filename: 'file2', instructions: 'Instructions for file2...' },
      { filename: 'file3', instructions: 'Instructions for file3...' },
    ];
    setFileData(mockData);
  }, []);

  // const fetchFiles = async () => {
  //   const response = await fetch("/instruction_logs", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //   });

  //const data = await response.json();
  //   setFileData(data);
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchFiles();
  // }, []);


  const handleOpenModal = (file: FileData) => {
    setSelectedFile(file);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <List className="w-full bg-gray-100 rounded p-4">
        {fileData.map((file) => (
        <ListItemButton key={file.filename} onClick={() => handleOpenModal(file)} className="mb-4 border border-gray-300 rounded">

            <ListItemText 
              primary={file.filename} 
              secondary={`${file.instructions.substring(0, 100)}...`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="view" onClick={(e) => { e.stopPropagation(); handleOpenModal(file); }}>
                <VisibilityIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
      {selectedFile && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>{selectedFile.filename}</DialogTitle>
          <DialogContent>
            <DialogContentText>{selectedFile.instructions}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default FileViewer;