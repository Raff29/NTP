import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFiles } from "../context/FileContext";
import LoaderSpinner from "./LoaderSpinner";
import Pagination from "./Pagination";

interface FileData {
  id: string;
  filename: string;
  instructions: string;
  is_archived: boolean;
}

const FileViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { files, addFile, archiveFile } = useFiles();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files
    .filter((file) => !file.is_archived)
    .slice(indexOfFirstItem, indexOfLastItem);
  const theme = useTheme();

  const fetchFiles = async () => {
    const response = await fetch("/instruction_logs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      const nonArchivedFiles = data.filter(
        (file: FileData) => !file.is_archived
      );
      nonArchivedFiles.forEach(addFile);
    } else {
      console.log("no instructions logs found");
    }
  };

  useEffect(() => {
    fetchFiles().then(() => {
      setLoading(false);
    });
  }, [files]);

  const archiveFiles = async (id: string) => {
    try {
      const response = await fetch(`/instruction_logs/archive/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      archiveFile(id);
      handleCloseModal();
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleOpenModal = (file: FileData) => {
    setSelectedFile(file);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      {loading ? (
        <LoaderSpinner loading={loading} />
      ) : (
        <List
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(2),
            boxShadow: theme.shadows[1],
          }}
        >
          {currentItems.length > 0 ? (
            currentItems.map((file) =>
              file.instructions ? (
                <ListItem
                  key={file.id}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: theme.typography.fontWeightMedium }}
                      >
                        {file.filename}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2">
                        {`${file.instructions.substring(0, 100)}...`}
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenModal(file);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ) : null
            )
          ) : (
            <Typography variant="body2" color="textSecondary">
              No files to display
            </Typography>
          )}
        </List>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={files.filter((file) => !file.is_archived).length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      {selectedFile && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>{selectedFile.filename}</DialogTitle>
          <DialogContent>
            <DialogContentText>{selectedFile.instructions}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => archiveFiles(selectedFile.id)}
              color="primary"
            >
              Archive
            </Button>
            <Button onClick={handleCloseModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default FileViewer;
