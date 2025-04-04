import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpense } from "../../store/featcher/expenseSlice";
import { Button, Modal } from "../ui";
import ExpenseForm, { ExpenseFormValues } from "../forms/ExpenseForm";
import ExpenseList from "../lists/ExpenseList";
import TotalExpense from "../lists/TotalExpense";

const ExpenseManager: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleAddExpense = (data: ExpenseFormValues) => {
    dispatch(addExpense(data));
    handleClose();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Expense Manager</h2>

      {/* مجموع هزینه‌ها */}
      <TotalExpense />

      <Button variant="primary" onClick={handleOpen} className="mt-4">
        + Add Expense
      </Button>

      {/* لیست هزینه‌ها */}
      <div className="mt-4">
        <ExpenseList />
      </div>

      {/* مودال اضافه کردن هزینه */}
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <ExpenseForm onSubmit={handleAddExpense} />
      </Modal>
    </div>
  );
};

export default ExpenseManager;
