import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition duration-300";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
