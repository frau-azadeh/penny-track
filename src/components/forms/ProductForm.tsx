import React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Input } from '../ui';

export interface ProductFormValues{
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  date: string;
}

interface ProductFormProps{
  defaultValues?: ProductFormValues;
  onSubmit: (data: ProductFormValues) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  const{
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<ProductFormValues>({
    defaultValues,
  });
  const handleFormSubmit = (data: ProductFormValues)=>{
    onSubmit(data);
    reset();
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4 p-4'>
      <h3 className='text-xl font-bold m-4'>افزودن / ویرایش محصول</h3>
      <div className='grid grid-col-1 gap-4'>
        <Input
          label='نام محصول'
          placeholder='نام محصول'
          {...register("name",{required: "نام محصول الزامی است."})}
          error={errors.name}
        />
        <Input
          label='دسته بندی'
          placeholder='دسته بندی'
          {...register("category", {required: "دسته بندی الزامی است"})}
          error={errors.category}
        />
        <Input
          label='توضیحات'
          placeholder='توضیحات'
          {...register("description", {required: "توضیحات الزامی است"})}
          error={errors.description}
        />
        <Input
          label='قیمت'
          placeholder='قیمت'
          type='number'
          {...register("price", {required: "قیمت الزامی است"})}
          error={errors.price}
        />
        <Input
          label='تعداد'
          placeholder='تعداد'
          type='number'
          error={errors.quantity}
          {...register("quantity", {required: "تعداد الزامی است"})}
        />
        <Input
          label="تاریخ"
          placeholder='تاریخ'
          type="date"
          error={errors.date}
          {...register("date", {required: "تاریخ الزامی است"})}
        />
      </div>
      <div className='flex justify-center m-4'>
        <Button variant='primary' type='submit' className='px-4 py-2'>
          ذخیره
        </Button>
      </div>
    </form>
  )
}

export default ProductForm