import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondray" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  type = "button",
  variant = "primary",
  ...rest
}) => {
  const baseStyles = "px-4 py-2 rounded-lg transition duration-300";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-900",
    secondray: "bg-gray-300 text-gray-700 hover:bg-gray-900",
    danger: "bg-red-600 test-white hover:bg-red-900",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}${className || ""}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
