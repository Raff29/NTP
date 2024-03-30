import React, { createContext, useState, useContext } from "react";

interface FileData {
  id: string;
  filename: string;
  instructions: string;
  is_archived: boolean;
}

interface FilesContextData {
  files: FileData[];
  addFile: (file: FileData) => void;
  archiveFile: (id: string) => void;
}

const FilesContext = createContext<FilesContextData | undefined>(undefined);

export const FilesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileData[]>([]);

  const addFile = (newFile: FileData) => {
    setFiles((prevFiles) => {
      const fileExists = prevFiles.some((file) => file.id === newFile.id);

      if (!fileExists) {
        return [...prevFiles, newFile];
      }

      return prevFiles;
    });
  };

  const archiveFile = (id: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => ({
        ...file,
        is_archived: file.id === id ? true : file.is_archived,
      }))
    );
  };

  return (
    <FilesContext.Provider value={{ files, addFile, archiveFile }}>
      {children}
    </FilesContext.Provider>
  );
};

export const useFiles = (): FilesContextData => {
  const context = useContext(FilesContext);
  if (!context) {
    throw new Error("useFiles must be used within a FilesProvider");
  }
  return context;
};

export default FilesContext;
