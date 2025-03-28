import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, Button } from '../ui';
export interface UserFormValues{
  name: string;
  email: string;
}

interface UserFormProps{
  onSubmit: (data: UserFormValues) => void;
  defaultValues?: UserFormValues;
}

const UserForm:React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<UserFormValues>({
    defaultValues,
  });
  const submitHandel: SubmitHandler<UserFormValues> = (data) =>{
    onSubmit(data)
  }
  return (
    <form
      onSubmit={handleSubmit(submitHandel)}
      className='space-y-4 bg-white p-6 rounded-lg shadow-md'
    >
      <h2 className='text-lg font-bold text-gray-700'>User Form</h2>
      <Input
        label="name"
        name="name"
        register={register}
        error={errors.name}
        placeholder= "Enter your name:"
        className="w-full"
      />
      <Input
        label='email'
        type='email'
        error={errors.email}
        register={register}
        name="name"
        placeholder='Enter your email'
        className='w-full'
      />
      <Button type="submit" variant='primary' className='w-full'>
        {defaultValues? "update user" : "add user"}
      </Button>

    </form>
  )
}

export default UserForm