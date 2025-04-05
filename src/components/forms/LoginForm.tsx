import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/featcher/authSlice";
import { Input, Button } from "../ui";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form Data:", data);
    const fakeToken = "fake.jwt.token";
    dispatch(login(fakeToken));
    toast.success("Login successful!");
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-700">Login</h2>

      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="Enter your email"
        className="w-full"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        error={errors.password}
        placeholder="Enter your password"
        className="w-full"
      />

      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
