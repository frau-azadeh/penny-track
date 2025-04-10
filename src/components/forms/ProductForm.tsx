import React from "react";
import { Button, Input } from "../ui";
import { useForm } from "react-hook-form";

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
      <h3 className="text-xl font-bold m-4">افزودن / ویرایش محصول</h3>
      <div className="grid grid-col-1 gap-4">
        <Input
          label="نام محصول"
          placeholder="نام محصول"
          type="text"
          error={errors.name}
          {...register("name", { required: "نام محصول الزامی است" })}
        />
        <Input
          label="دسته بندی"
          placeholder="دسته  بندی"
          type="text"
          error={errors.category}
          {...register("category", { required: "دسته بندی الزامی است" })}
        />
        <Input
          label="توضیحات"
          placeholder="توضیحات"
          type="text"
          error={errors.description}
          {...register("description", { required: "توضیحات الزامی است" })}
        />
        <Input
          label="قیمت"
          placeholder="قیمت"
          error={errors.price}
          type="number"
          {...register("price", { required: "قیمت الزامی است" })}
        />
        <Input
          label="تعداد"
          placeholder="تعداد"
          type="number"
          error={errors.quantity}
          {...register("quantity", { required: "تعداد الزامی است" })}
        />
        <Input
          label="تاریخ"
          placeholder="تاریخ"
          type="date"
          error={errors.date}
          {...register("date", { required: "تاریخ الزامی است" })}
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
