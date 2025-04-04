import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import { Input, Button } from "../ui";

export interface ProductFormValues {
  name: string;
  price: number;
  quantity: number;
  description: string;
  date: string;
  category: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues,
  });

  // 🔥 گرفتن دسته‌بندی‌ها از استور
  const categories = useSelector((state: RootState) => state.category.categories);

  const submitHandler: SubmitHandler<ProductFormValues> = (data) => {
    onSubmit(data);
    toast.success(
      defaultValues ? "محصول با موفقیت ویرایش شد!" : "محصول با موفقیت اضافه شد!",
    );
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-700">Product Form</h2>

      <Input
        label="Product Name"
        name="name"
        register={register}
        error={errors.name}
        placeholder="Enter product name"
        className="w-full"
      />
      <Input
        label="Price"
        name="price"
        type="number"
        register={register}
        error={errors.price}
        placeholder="Enter product price"
        className="w-full"
      />
      <Input
        label="Quantity"
        name="quantity"
        type="number"
        register={register}
        error={errors.quantity}
        placeholder="Enter product quantity"
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
        register={register}
        error={errors.description}
        placeholder="Enter product description"
        className="w-full"
      />

      {/* 🔥 Select Box برای انتخاب دسته‌بندی */}
      <div>
        <label className="block mb-1">Category</label>
        <select
          {...register("category")}
          className="border px-2 py-1 rounded-md w-full"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
