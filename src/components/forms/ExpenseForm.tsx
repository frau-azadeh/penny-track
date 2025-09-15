import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Button, Input } from "../ui";

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
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ExpenseFormValues>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<ExpenseFormValues> = (data) => {
    data.amount = Number(data.amount);
    onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-700">
        {defaultValues ? "ویرایش هزینه" : "افزودن هزینه"}
      </h2>
      <Input
        label="عنوان"
        {...register("title", { required: "عنوان الزامی است" })}
        error={errors.title}
        placeholder="عنوان هزینه را وارد کنید"
        className="w-full"
      />

      <Input
        label="مبلغ"
        {...register("amount", {
          required: "مبلغ الزامی است",
          valueAsNumber: true,
          min: { value: 1, message: "مبلغ باید بزرگتر از 0 باشد" },
        })}
        type="number"
        error={errors.amount}
        placeholder="مبلغ را وارد کنید"
        className="w-full"
      />

      <Input
        label="تاریخ"
        {...register("date", { required: "تاریخ الزامی است" })}
        type="date"
        error={errors.date}
        className="w-full"
      />

      <Input
        label="توضیحات"
        {...register("description", { required: "توضیحات الزامی است" })}
        error={errors.description}
        className="w-full"
        placeholder="توضیحات را وارد کنید"
      />
      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "ویرایش هزینه" : "افزودن هزینه"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
