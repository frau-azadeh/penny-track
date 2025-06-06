import React from "react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
  return (
    <div>
      {Array.from({ length: totalPage }).map((_, index) => (
        <Button
          key={index}
          variant={index + 1 === currentPage ? "primary" : "secondary"}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
