import React from "react";
import { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: "text" | "number" | "email" | "select" | "radio" | "file";
  placeholder?: string;
  register: UseFormRegister<T>;
  required?: string;
  error?: FieldError;
  options?: { value: string; label: string }[];
  accept?: string; 
  step?: string; 
}

const InputField = <T extends FieldValues>({
  name,
  label,
  type = "text",
  step,
  accept,
  placeholder,
  register,
  required,
  error,
  options,
}: InputFieldProps<T>) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      {type === "select" && options ? (
        <select
          {...register(name, { required })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "radio" && options ? (
        <div>
          {options.map((option) => (
            <label key={option.value} className="inline-flex items-center mr-4">
              <input
                {...register(name, { required })}
                type="radio"
                value={option.value}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <input
          {...register(name, { required })}
          type={type}
          step={step}
          accept={accept}
          className="w-full p-2 border rounded"
          placeholder={placeholder}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default InputField;
