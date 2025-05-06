import { log } from "console";
import React from "react";

export default function InputField({
  label,
  name,
  type = "text",
  register,
  error,
  icon,
  placeholder,
}) {
  if (error) {
    console.log(error);
  }

  return (
    <div className="flex flex-col">
      <label className="capitalize mb-1" htmlFor={name}>
        {label}
      </label>
      <div
        className={`border ${
          error ? "border-themeError-300" : "border-themeGrey-200"
        } flex items-center gap-1 rounded-full px-2 overflow-hidden`}
      >
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          className="p-2 ring ring-transparent focus:outline-none focus:ring-0 focus:border-transparent w-full"
        />
      </div>
    </div>
  );
}
