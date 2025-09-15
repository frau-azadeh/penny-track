import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import ProductCharts from "../charts/ProductCharts";
import DownloadExcel from "../utils/DownloadExcel";

const ProductDashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Product Dashboard</h2>
      <ProductCharts />
      <DownloadExcel products={products} />
    </div>
  );
};

export default ProductDashboard;
