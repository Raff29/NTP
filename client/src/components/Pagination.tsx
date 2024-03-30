import React from "react";
import Pagination from "@mui/material/Pagination";

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

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </div>
  );
};

export default PaginationComponent;