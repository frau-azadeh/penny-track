import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  Expense,
  deleteExpense,
  updateExpense,
} from "../../store/featcher/expenseSlice";
import { Button, Modal } from "../ui";
import ExpenseForm, { ExpenseFormValues } from "../forms/ExpenseForm";
import ExpenseSearch from "../filters/ExpenseSearch";
import DateFilter from "../filters/DateFilter";

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch();

  // گرفتن داده‌ها از استیت
  const expenses: Expense[] = useSelector(
    (state: RootState) => state.expenses.expenses,
  );
  const searchQuery = useSelector(
    (state: RootState) => state.expenses.searchQuery,
  );
  const startDate = useSelector((state: RootState) => state.expenses.startDate);
  const endDate = useSelector((state: RootState) => state.expenses.endDate);

  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 📝 فیلتر کردن هزینه‌ها با استفاده از useMemo
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const title = expense.title ? expense.title.toLowerCase() : "";
      const description = expense.description
        ? expense.description.toLowerCase()
        : "";
      const search = searchQuery ? searchQuery.toLowerCase() : "";

      const matchesSearch =
        title.includes(search) || description.includes(search);

      // 🗓️ مقایسه تاریخ با استفاده از Date
      const expenseDate = new Date(expense.date);
      const startDateValue = startDate ? new Date(startDate) : null;
      const endDateValue = endDate ? new Date(endDate) : null;

      const matchesStartDate = startDateValue
        ? expenseDate >= startDateValue
        : true;
      const matchesEndDate = endDateValue ? expenseDate <= endDateValue : true;

      return matchesSearch && matchesStartDate && matchesEndDate;
    });
  }, [expenses, searchQuery, startDate, endDate]);

  // حذف هزینه
  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  // باز کردن مودال ویرایش
  const handleEdit = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsEditOpen(true);
  };

  // به‌روزرسانی هزینه
  const handleUpdate = (data: ExpenseFormValues) => {
    if (selectedExpense) {
      dispatch(updateExpense({ id: selectedExpense.id, ...data }));
      setIsEditOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 🔍 کامپوننت جستجو */}
      <ExpenseSearch />
      {/* 📅 فیلتر تاریخ */}
      <DateFilter />

      {filteredExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses found.</p>
      ) : (
        filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-md"
          >
            <div>
              <h3 className="font-semibold">{expense.title}</h3>
              <p className="text-sm text-gray-600">
                Amount: ${Number(expense.amount).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Date: {expense.date}</p>
              <p className="text-sm text-gray-600">
                Description: {expense.description}
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="secondary" onClick={() => handleEdit(expense)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(expense.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))
      )}

      {/* 📝 مودال ویرایش هزینه */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {selectedExpense && (
          <ExpenseForm
            defaultValues={{
              title: selectedExpense.title,
              amount: selectedExpense.amount,
              date: selectedExpense.date,
              description: selectedExpense.description,
            }}
            onSubmit={handleUpdate}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExpenseList;
