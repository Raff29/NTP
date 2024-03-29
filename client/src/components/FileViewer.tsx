import {
  List,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ListItemButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import LoaderSpinner from "./LoaderSpinner";

interface FileData {
  id: string;
  filename: string;
  instructions: string;
  is_archived: boolean;
}

const FileViewer: React.FC = () => {
  const [fileData, setFileData] = useState<FileData[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFiles = async () => {
    const response = await fetch("/instruction_logs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (Array.isArray(data)) {
      const nonArchivedFiles = data.filter((file: FileData) => !file.is_archived);
      setFileData(nonArchivedFiles);
    } else {
      console.log("no intructions logs found");
      setFileData([]);
    }
  };

  useEffect(() => {
    fetchFiles().then(() => {
      setLoading(false);
    });
  }, []);

  const archiveFiles = async (id: string) => {
    const response = await fetch(`/instruction_logs/archive/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);

    handleCloseModal();
  };

  const handleOpenModal = (file: FileData) => {
    setSelectedFile(file);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      {loading ? (
        <LoaderSpinner loading={loading} />
      ) : (
        <List className="w-full bg-gray-100 rounded p-4">
          {fileData && fileData.length > 0 ? (
            fileData.map((file) =>
              file.instructions ? (
                <ListItemButton
                  key={file.filename}
                  onClick={() => handleOpenModal(file)}
                  className="mb-4 border border-gray-300 rounded"
                >
                  <ListItemText
                    primary={
                      <span className="overflow-auto break-words max-w-[calc(100%-3rem)]">
                        {file.filename}
                      </span>
                    }
                    secondary={
                      <span className="overflow-auto break-words max-w-[calc(100%-3rem)]">{`${file.instructions.substring(
                        0,
                        100
                      )}...`}</span>
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
                </ListItemButton>
              ) : null
            )
          ) : (
            <p>No files to display</p>
          )}
        </List>
      )}
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
              Archieve
            </Button>
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
