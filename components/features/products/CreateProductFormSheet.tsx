import { Input } from "@/components/ui/input";
import { SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSignIcon, File, Percent, TagIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../../ui/textarea";
import { InputField } from "@/components/ui/customs/InputField";
import SelectField from "@/components/ui/customs/SelectField";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DIMENSION = { width: 800, height: 800 };
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

type OptionType = {
  label: string;
  options: { value: string; label: string }[];
};

const productCategories: OptionType[] = [
  {
    label: "Athletic",
    options: [
      { value: "running-shoes", label: "Running Shoes" },
      { value: "basketball-shoes", label: "Basketball Shoes" },
      { value: "tennis-shoes", label: "Tennis Shoes" },
      { value: "cross-training", label: "Cross Training" },
      { value: "hiking-boots", label: "Hiking Boots" },
    ],
  },
  {
    label: "Formal",
    options: [
      { value: "oxfords", label: "Oxfords" },
      { value: "brogues", label: "Brogues" },
      { value: "dress-boots", label: "Dress Boots" },
      { value: "pumps", label: "Pumps" },
      { value: "stilettos", label: "Stilettos" },
    ],
  },
  {
    label: "Casual",
    options: [
      { value: "sneakers", label: "Sneakers" },
      { value: "loafers", label: "Loafers" },
      { value: "boat-shoes", label: "Boat Shoes" },
      { value: "canvas-shoes", label: "Canvas Shoes" },
      { value: "slip-ons", label: "Slip-ons" },
    ],
  },
];

const productSchema = z.object({
  product: z
    .string()
    .trim()
    .min(3, { message: "At least 3 characters" })
    .max(60, { message: "50 - 60 characters is the recommended length" }),

  description: z
    .string()
    .max(160, { message: "120 - 160 characters is the recommended length" }),
  price: z.number().gte(1, { message: "Price must be greater than $1" }),
  discount: z.number().gte(0, { message: "Discount must be 0 or more" }),
  category: z.string().min(1, { message: "Select a category" }),
  images: z
    .any()
    .refine(
      (files) => {
        return files && files[0]?.size <= MAX_FILE_SIZE;
      },
      {
        message: "Max image size is 5MB.",
      }
    )
    .refine(
      (files) => {
        return files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
      },
      {
        message: "Please upload a valid image file (JPEG, PNG, or WebP).",
      }
    )
    .refine(
      (files) =>
        new Promise((resolve) => {
          if (!files || !files[0]) {
            resolve(false);
            return;
          }

          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              const meetsDimensions =
                img.width <= MAX_DIMENSION.width &&
                img.height <= MAX_DIMENSION.height;
              resolve(meetsDimensions);
            };
            img.src = e.target?.result as string;
          };
          reader.readAsDataURL(files[0]);
        }),
      {
        message: "Image dimensions are too large.",
      }
    ),
});

type ProductType = z.infer<typeof productSchema>;

const options = ["general", "upload"];

export default function CreateProductFormSheet() {
  const [isActive, setIsActive] = useState<"general" | "upload">("general");
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  function onSubmit(values: ProductType) {
    console.log(values);
  }

  function handleOptionChange(option: "general" | "upload") {
    setIsActive(option);
  }
  return (
    <>
      <SheetHeader className="flex flex-row items-center justify-between">
        <SheetTitle>Add New Product</SheetTitle>
        <SheetClose className="p-1 rounded-full bg-black  hover:opacity-100 focus:outline-none focus:ring-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 cursor-pointer">
          <X size={12} className="w-4 h-4 text-white" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetHeader>

      <div className="flex items-center gap-2 mx-4 border-b border-gray-300">
        {options.map((option) => (
          <Button
            onClick={() => handleOptionChange(option)}
            key={option}
            className={cn(
              "capitalize py-2 text-sm bg-white rounded-none text-black cursor-pointer hover:bg-transparent border-b-3 border-transparent",
              isActive === option &&
                "border-b-3 border-themeOrange-300 text-themeOrange-300"
            )}
          >
            {option}
          </Button>
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full px-4"
        >
          {isActive === "general" && (
            <div className="flex flex-col space-y-4">
              {/* Product name */}
              <InputField
                form={form}
                type="product"
                label="Product Name"
                description=" 50-60 character is the recommended length."
                placeholder="Input your product"
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => {
                  const error = form.formState.errors.description?.message;
                  console.log(error);
                  return (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl className="">
                        <Textarea
                          className={cn(
                            "resize-none border-0 ring-2 focus-visible:ring-2 focus-visible:ring-themeOrange-300 focus-visible:border-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [MozAppearance:textfield]",
                            error ? "!ring-red-500" : "!ring-gray-300"
                          )}
                          rows={5}
                          placeholder="Input your description for the product"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        120-160 character is the recommended length.
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />

              {/* Category */}
              <SelectField
                form={form}
                formSelectData={productCategories}
                type="category"
              />

              <div className="flex items-center justify-between gap-6">
                <InputField
                  form={form}
                  type="price"
                  inputType="number"
                  icon={CircleDollarSignIcon}
                  placeholder="Input your price"
                  min={0}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => {
                    const error = form.formState.errors.discount?.message;
                    return (
                      <FormItem className="relative flex-1">
                        <FormLabel>Discount</FormLabel>
                        <div
                          className={`border-2 border-gray-300 rounded-full flex px-2 items-center transition-all duration-200 focus-within:ring-1 focus-within:ring-themeOrange-300 focus-within:border-themeOrange-300 ${
                            error ? "border-red-500" : "border-gray-200"
                          }`}
                        >
                          <TagIcon
                            size={17}
                            className={`${
                              error ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                          <FormControl className="">
                            <Input
                              type="number"
                              min={0}
                              placeholder="Input your discount"
                              {...field}
                              className="border-none ring-0 focus-visible:border-none focus-visible:ring-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [MozAppearance:textfield]"
                            />
                          </FormControl>
                          <Percent
                            size={20}
                            className={`${
                              error ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
          )}

          {isActive === "upload" && (
            <>
              <div className="rounded-sm bg-amber-50/20 h-[150px] w-full flex items-center justify-center">
                <label
                  htmlFor="images"
                  className="flex items-center gap-1 px-4 py-2 text-sm border rounded-full cursor-pointer border-themeOrange-300 text-themeOrange-300"
                >
                  <File size={18} />
                  Browse File
                </label>
                <input
                  type="file"
                  id="images"
                  {...form.register("images")}
                  accept="image/png, image/gif, image/jpeg"
                  className="hidden"
                />
              </div>
              {form.formState.errors.images?.message ? (
                <span className="text-red-400">
                  {form.formState.errors.images?.message}
                </span>
              ) : (
                <p className="text-green-500">Success</p>
              )}
            </>
          )}

          <div className="flex items-center gap-2 py-2 mt-auto">
            <SheetClose className="flex-1">
              <div className="w-full py-1.5 bg-white border rounded-full text-themeOrange-300 border-themeOrange-300 hover:bg-gray-300/20">
                Cancel
              </div>
            </SheetClose>
            <Button
              variant="standard"
              size="pill"
              type="submit"
              className="rounded-full flex-2"
            >
              Publish Product
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
