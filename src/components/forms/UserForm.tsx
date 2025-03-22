import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input } from "../ui";

interface UserFormValues {
  username: string;
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

  const submitHandler: SubmitHandler<UserFormValues> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-blod text-gray-700">User Form</h2>
      <Input
        label="Username"
        name="username"
        register={register}
        error={errors.username}
        placeholder="Enter your name:"
        className="w-full"
      />
      <Input
        label="email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="Enter your email"
        className="w-full"
      />
      <Button type="submit" variant="primary" className="w-full">
        {defaultValues ? "update user" : "add user"}
      </Button>
    </form>
  );
};

export default UserForm;
