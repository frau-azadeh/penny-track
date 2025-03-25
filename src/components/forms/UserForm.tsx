import React from "react";
import { Button, Input } from "../ui";
import { SubmitHandler, useForm } from "react-hook-form";

export interface UserFormValues {
  name: string;
  email: string;
}

interface UserFormProps {
  onSubmit: (data: UserFormValues) => void;
  defaultValues?: UserFormValues;
}
const UserForm: React.FC<UserFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues,
  });

  const submitHandel: SubmitHandler<UserFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandel)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-700">User Form</h2>
      <Input
        label="name"
        name="name"
        register={register}
        error={errors.name}
        placeholder="Enter your username"
        className="w-full"
      />
      <Input
        label="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        className="w-full"
        error={errors.email}
        register={register}
      />
      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "update user" : "add user"}
      </Button>
    </form>
  );
};

export default UserForm;
