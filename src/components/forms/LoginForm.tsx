import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/featcher/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button } from "../ui";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    dispatch(login());
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
        label="Username"
        {...register("username")}
        placeholder="Enter your username"
      />
      <Input
        label="Password"
        {...register("password")}
        type="password"
        placeholder="Enter your password"
      />

      <Button type="submit" variant="primary" className="w-full">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
