import { InputHTMLAttributes } from "react"
import {FieldError, FieldValues, Path, UseFormRegister} from "react-hook-form"

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement>{
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}

const Input =<T extends FieldValues> ({
  label,
  name,
  register,
  className,
  error,
  ...rest
}:InputProps<T>) => {
  return (
    <div>
      <label htmlFor={name as string}>{label}</label>
      <input
        id= {name as string}
        {...register(name as Path<T>)}
        {...rest}
        className={`px-4 py-2 rounded-lg focus: outline-none focus: ring-2 ${
          error 
          ? "border-red-500 focus: ring-red-500"
          : "border-gray-300 focus: ring-blue-500"
        }${className || ""}`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  )
}

export default Input