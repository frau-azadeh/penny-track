import React from "react";

import * as XLSX from "xlsx";

import { Product } from "../../store/featcher/productSlice";
import { Button } from "../ui";

interface DownloadExcelProps {
  products: Product[];
}

const DownloadExcel: React.FC<DownloadExcelProps> = ({ products }) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  return (
    <Button variant="primary" onClick={handleDownload}>
      Download Excel
    </Button>
  );
};

export default DownloadExcel;
