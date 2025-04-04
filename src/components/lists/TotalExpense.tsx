import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const TotalExpense: React.FC = () => {
  // گرفتن لیست هزینه‌ها از استور
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  // محاسبه مجموع هزینه‌ها با بررسی عددی بودن
  const total = expenses.reduce((acc, expense) => acc + (Number(expense.amount) || 0), 0);

  return (
    <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
      <h2 className="text-xl font-bold">Total Expenses</h2>
      <p className="text-2xl text-blue-800">${Number.isFinite(total) ? total.toFixed(2) : "0.00"}</p>
    </div>
  );
};

export default TotalExpense;
