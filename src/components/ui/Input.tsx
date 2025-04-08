import { forwardRef, InputHTMLAttributes } from "react"
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  error?: FieldError
}

const Input =forwardRef<HTMLInputElement, InputProps> (({
  label,
  name,
  className,
  error,
  ...rest
}, ref) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        ref={ref}
        className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
          error
            ? "border border-red-500 focus:ring-red-500"
            : "border border-gray-500 focus:ring-gray-500"
        }`}
        {...rest}
      />
    </div>
  )
}
)
export default Input