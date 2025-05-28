import { Eye, EyeClosed, LucideIcon, MailIcon } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "../form";
import { cn } from "@/lib/utils";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "../input";
import { useState } from "react";

export function InputField<T extends FieldValues>({
  form,
  type,
  editForm,
  icon,
  name,
  placeholder,
}: {
  form: UseFormReturn<T>;
  type: FieldPath<T>;
  editForm?: boolean;
  icon?: LucideIcon;
  name?: string;
  placeholder?: string;
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
            <FormLabel>{`${
              type.charAt(0).toUpperCase() + type.slice(1)
            }`}</FormLabel>
            <div
              className={cn(
                "border-2 border-gray-300 rounded-full flex px-2 items-center transition-all duration-200 focus-within:ring-1 focus-within:ring-themeOrange-300 focus-within:border-themeOrange-300",
                error ? "border-red-500" : "border-gray-300"
              )}
            >
              <IconComponent size={20} className="text-gray-400" />
              <FormControl>
                <Input
                  type={
                    name === "password" || name === "confirm"
                      ? isPasswordShown
                        ? "text"
                        : "password"
                      : type
                  }
                  placeholder={
                    placeholder ||
                    `${type.charAt(0).toUpperCase() + type.slice(1)}`
                  }
                  disabled={editForm}
                  {...field}
                  className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
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
          </FormItem>
        );
      }}
    />
  );
}
