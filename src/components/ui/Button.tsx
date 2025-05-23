import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  children,
  className,
  ...rest
}) => {
  const baseStyle = "px-4 py-2 rounded-lg transition duration-300";
  const variantStyle = {
    primary: "bg-blue-500 text-white hover:bg-blue-900",
    danger: "bg-red-500 text-white hover:bg-red-900",
    secondary: "bg-gray-500 text-white hover:bg-gray-900",
  };
  return (
    <button
      className={`${className || ""} ${baseStyle} ${variantStyle[variant]}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
