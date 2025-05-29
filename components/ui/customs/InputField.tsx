import { Eye, EyeClosed, LucideIcon, MailIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../form";
import { cn } from "@/lib/utils";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "../input";
import { useState } from "react";

export function InputField<T extends FieldValues>({
  form,
  type,
  editForm,
  icon,
  label,
  inputType = "text",
  name,
  placeholder,
  description,
  min,
}: {
  form: UseFormReturn<T>;
  type: FieldPath<T>;
  editForm?: boolean;
  icon?: LucideIcon;
  label?: string;
  inputType?: "text" | "email" | "password" | "number";
  name?: string;
  placeholder?: string;
  description?: string;
  min?: number;
}) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  function showPassword() {
    setIsPasswordShown(!isPasswordShown);
  }

  const IconComponent = icon || MailIcon;
  return (
    <FormField
      control={form.control}
      name={type}
      render={({ field }) => {
        const error = form.formState.errors[type];
        return (
          <FormItem className="flex-1">
            <FormLabel>
              {label || `${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </FormLabel>
            <div
              className={cn(
                "border-2 border-gray-300 rounded-full flex px-2 items-center transition-all duration-200 focus-within:ring-1 focus-within:ring-themeOrange-300 focus-within:border-themeOrange-300",
                error ? "border-red-500" : "border-gray-300"
              )}
            >
              {icon && (
                <IconComponent
                  size={20}
                  className={cn(error ? "text-red-500" : "text-gray-400")}
                />
              )}
              <FormControl>
                <Input
                  type={
                    name === "password" || name === "confirm"
                      ? isPasswordShown
                        ? "text"
                        : "password"
                      : inputType
                  }
                  min={min || undefined}
                  placeholder={
                    placeholder ||
                    `${type.charAt(0).toUpperCase() + type.slice(1)}`
                  }
                  disabled={editForm}
                  {...field}
                  className={cn(
                    "bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none",
                    inputType === "number" &&
                      "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [MozAppearance:textfield]"
                  )}
                />
              </FormControl>
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
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
