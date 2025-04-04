import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Button } from "../ui";

export interface ExpenseFormValues {
  title: string;
  amount: number;
  date: string;
  description: string;
}

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormValues) => void;
  defaultValues?: ExpenseFormValues;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormValues>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<ExpenseFormValues> = (data) => {
    onSubmit(data);
    reset(); // پاک کردن فرم بعد از ارسال
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-700">Expense Form</h2>
      <Input
        label="Title"
        name="title"
        register={register}
        error={errors.title}
        placeholder="Enter expense title"
        className="w-full"
      />
      <Input
        label="Amount"
        name="amount"
        type="number"
        register={register}
        error={errors.amount}
        placeholder="Enter amount"
        className="w-full"
      />
      <Input
        label="Date"
        name="date"
        type="date"
        register={register}
        error={errors.date}
        className="w-full"
      />
      <Input
        label="Description"
        name="description"
        type="description"
        register={register}
        error={errors.description}
        className="w-full"
      />
      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
