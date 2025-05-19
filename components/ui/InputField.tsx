import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

export default function InputField({
  label,
  name,
  type = "text",
  register,
  error,
  icon,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
  icon?: React.ReactNode;
  placeholder: string;
}) {
  if (error) {
    console.log(error);
  }
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  function showPassword() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <div className="flex flex-col">
      <label className="text-sm md:text-[14px] capitalize mb-1" htmlFor={name}>
        {label}
      </label>
      <div
        className={`border ${
          error ? "border-themeError-300" : "border-themeGrey-200"
        } flex items-center gap-1 rounded-full px-2 overflow-hidden`}
      >
        {icon}
        <input
          type={
            type === "password" ? (isPasswordShown ? "text" : "password") : type
          }
          placeholder={placeholder}
          {...register(name)}
          className="p-2 ring ring-transparent focus:outline-none focus:ring-0 focus:border-transparent w-full placeholder:text-sm placeholder:md:text-[14px]"
        />

        {(name === "password" || name === "confirm") && (
          <span onClick={showPassword}>
            {!isPasswordShown ? (
              <Eye size={18} strokeWidth={1.5} />
            ) : (
              <EyeClosed size={18} strokeWidth={1.5} />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
