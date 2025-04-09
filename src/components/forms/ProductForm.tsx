import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../ui";

export interface ProductFormValues {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
}

interface ProductFormProps {
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues,
  });

  const handleFormSubmit = (data: ProductFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4">
      <h3 className="text-xl font-semibold mb-4">افزودن/ویرایش محصول</h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="نام محصول"
          {...register("name", { required: "نام محصول الزامی است" })}
          placeholder="نام محصول"
          error={errors.name}
        />
        <Input
          label="دسته‌بندی"
          {...register("category", { required: "دسته‌بندی الزامی است" })}
          placeholder="دسته‌بندی"
          error={errors.category}
        />
        <Input
          label="توضیحات"
          {...register("description", { required: "توضیحات الزامی است" })}
          placeholder="توضیحات"
          error={errors.description}
        />
        <Input
          label="قیمت"
          type="number"
          {...register("price", { required: "قیمت الزامی است" })}
          placeholder="قیمت"
          error={errors.price}
        />
        <Input
          label="تعداد"
          type="number"
          {...register("quantity", { required: "تعداد الزامی است" })}
          placeholder="تعداد"
          error={errors.quantity}
        />
        <Input
          label="تاریخ"
          type="date"
          {...register("date", { required: "تاریخ الزامی است" })}
          error={errors.date}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" variant="primary" className="px-4 py-2">
          ذخیره
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
