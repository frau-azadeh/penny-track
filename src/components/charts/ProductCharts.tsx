import React from "react";

import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { RootState } from "../../store/store";

const ProductCharts: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  // داده‌های نمودار میله‌ای (قیمت محصولات)
  const priceData = products.map((product) => ({
    name: product.name,
    price: product.price,
  }));

  return (
    <div className="flex justify-center p-4">
      <div className="w-full lg:w-1/2">
        <h3 className="text-lg font-semibold">Price by Product</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="price" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductCharts;
