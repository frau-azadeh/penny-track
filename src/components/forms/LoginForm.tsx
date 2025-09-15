import React from "react";

import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { login } from "../../store/featcher/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { Button, Input } from "../ui";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await dispatch(login(data)).unwrap();
      if (result) {
        toast.success("ورود موفقیت‌آمیز بود: " + result.full_name);
        navigate("/dashboard");
      } else {
        toast.error("ورود ناموفق: داده نامعتبر");
      }
    } catch (error) {
      toast.error("خطا در ورود: " + (error as string));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">
          ورود به سیستم
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="ایمیل"
              placeholder="ایمیل خود را وارد کنید"
              error={errors.email}
              {...register("email", {
                required: "وارد کردن ایمیل الزامی است",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "فرمت ایمیل صحیح نیست",
                },
              })}
            />
          </div>

          <div>
            <Input
              label="رمز عبور"
              type="password"
              placeholder="رمز عبور"
              error={errors.password}
              {...register("password", {
                required: "وارد کردن رمز عبور الزامی است",
                minLength: {
                  value: 6,
                  message: "رمز عبور باید حداقل 6 کاراکتر باشد",
                },
              })}
            />
          </div>

          <Button type="submit" variant="primary" className="w-full">
            ورود
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
