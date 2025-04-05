import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui";

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
  const { register, handleSubmit, reset } = useForm<ProductFormValues>({
    defaultValues,
  });

  const handleFormSubmit = (data: ProductFormValues) => {
    onSubmit(data);
    reset(); // پاک کردن فرم پس از ارسال
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 p-4">
      <h3 className="text-xl font-semibold mb-4">افزودن/ویرایش محصول</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">نام محصول</label>
          <input
            {...register("name")}
            placeholder="نام محصول"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">دسته‌بندی</label>
          <input
            {...register("category")}
            placeholder="دسته‌بندی"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">توضیحات</label>
          <input
            {...register("description")}
            placeholder="توضیحات"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">قیمت</label>
          <input
            type="number"
            {...register("price")}
            placeholder="قیمت"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">تعداد</label>
          <input
            type="number"
            {...register("quantity")}
            placeholder="تعداد"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">تاریخ</label>
          <input
            type="date"
            {...register("date")}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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
