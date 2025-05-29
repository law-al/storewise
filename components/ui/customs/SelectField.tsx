import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormLabel } from "../form";
import { LucideIcon, MailIcon } from "lucide-react";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type OptionDataType = {
  label: string;
  options: { value: string; label: string }[];
};

export default function SelectField<T extends FieldValues>({
  form,
  type,
  editProfile,
  icon,
  formSelectData,
}: {
  form: UseFormReturn<T>;
  type: FieldPath<T>;
  editProfile?: boolean;
  icon?: LucideIcon;
  formSelectData: OptionDataType[];
}) {
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
            <Select
              disabled={editProfile}
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger
                className={cn(
                  "flex items-center w-full px-3 py-5 transition-all duration-200 border-2 border-gray-300 rounded-full focus-visible:ring-1 focus-visible:ring-themeOrange-300 focus-visible:border-themeOrange-300",
                  error ? "border-red-500" : "border-gray-300"
                )}
              >
                {icon && <IconComponent size={15} />}
                <SelectValue placeholder={`Select a ${type}`} />
              </SelectTrigger>
              <SelectContent>
                {formSelectData.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        );
      }}
    />
  );
}
