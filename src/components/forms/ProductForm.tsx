import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "../ui";

export interface ProductFormValues {
  name: string;
  price: number;
  quantity: number;
  description: string;
  date: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<ProductFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
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

      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
