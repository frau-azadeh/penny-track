import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: "primary" | "secondary" | "danger";
}

const Button:React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  type="submit",
  ...rest
}) => {
  const baseStyle = "px-4 py-2 rounded-lg transition duration-300";
  const variantStyle = {
    primary: "bg-blue-600 text-white hover:bg-blue-900",
    secondary: "bg-gray-600 text-white hover:bg-gray-900",
    danger: "bg-red-600 text-white hover:bg-red-900",
  }
  return (
    <button
      className={`${className || ""} ${baseStyle} ${variantStyle[variant]}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button