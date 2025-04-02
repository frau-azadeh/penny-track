import { InputHTMLAttributes } from "react"
import {
   FieldError,
   UseFormRegister, 
   FieldValues, 
   Path
  } from "react-hook-form"

interface InputProps<T extends FieldValues>
 extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  error?: FieldError;
  register: UseFormRegister<T>;
  name: Path<T>;
}

const Input = <T extends FieldValues>({
  label,
  name,
  className,
  register,
  error,
  ...rest
}:InputProps<T>) => {
  return (
    <div>
      <label htmlFor={name as string}>{label}</label>
      <input
        id={name as string}
        {...register(name as Path<T>)}
        {...rest}
        className={`px-4 pv-2 rounded-lg focus:outline-none focus:ring-2 ${
          error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-gray-300"
        }${className || ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default Input