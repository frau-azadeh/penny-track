import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondray" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "primary",
  className,
  ...rest
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-bold transition duration-300";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondray: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
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
