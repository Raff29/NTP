import { Button, Box, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFiles } from "../context/FileContext";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUploader() {
  const { files, addFile } = useFiles();
  const [showAlert, setShowAlert] = useState(false);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/instruction_logs", {
      method: "POST",
      body: formData,
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      addFile(data);
      console.log("File uploaded successfully: ", data);
    } else {
      console.error("File upload failed: ", response.statusText);
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const alreadyUploaded = files.some(f => f.filename === file.name);
      if (alreadyUploaded) {
        setShowAlert(true);
      } else {
        uploadFile(file);
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
    {showAlert && <Alert severity="warning" onClose={() => setShowAlert(false)}>This file has already been uploaded.</Alert>}
      <Button
        component="label"
        role={"button"}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleUpload} />
      </Button>
    </Box>
  );
}
