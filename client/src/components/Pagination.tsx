import React from "react";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const theme = useTheme();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={2}
      sx={{ color: theme.palette.text.primary }}
    >
      <div className="flex items-center justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          siblingCount={1} 
          boundaryCount={1} 
        />
      </div>
    </Box>
  );
};

export default PaginationComponent;
