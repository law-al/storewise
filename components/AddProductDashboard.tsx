import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSignIcon, File, Percent, TagIcon, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "./ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DIMENSION = { width: 800, height: 800 };
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
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

type Input = z.infer<typeof schema>;

const options = ["general", "upload"];

export default function AddProductDashboard() {
  const [isActive, setIsActive] = useState<"general" | "upload">("general");
  const form = useForm<Input>({
    resolver: zodResolver(schema),
  });
  console.log(form.formState);
  function onSubmit(values: z.infer<typeof schema>) {
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
          <X size={12} className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetHeader>

      <div className="flex items-center gap-2 border-b border-gray-300 mx-4">
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
          className="px-4 flex flex-col h-full"
        >
          {isActive === "general" && (
            <div className="flex flex-col space-y-4">
              {/* Product name */}
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Input your product"
                        {...field}
                        className="rounded-full focus-visible:border-themeOrange-300 focus-visible:border-[1px] focus-visible:ring-themeOrange-300 focus-visible:ring-[1px]"
                      />
                    </FormControl>
                    <FormDescription>
                      50-60 character is the recommended length.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Input your description for the product"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      120-160 character is the recommended length.
                    </FormDescription>
                  </FormItem>
                )}
              />

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded-full focus-visible:border-themeOrange-300 focus-visible:border-[1px] focus-visible:ring-themeOrange-300 focus-visible:ring-[1px]">
                          <SelectValue placeholder="Input your category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => {
                    const error = form.formState.errors.price?.message;
                    return (
                      <FormItem className="flex-1 relative">
                        <FormLabel>Price</FormLabel>
                        <div
                          className={`border  flex items-center rounded-full focus-visible:border-themeOrange-300 focus-visible:border-[1px] focus-visible:ring-themeOrange-300 focus-visible:ring-[1px] px-2 ${
                            error ? "border-red-500" : "border-gray-200"
                          }`}
                        >
                          <CircleDollarSignIcon
                            size={20}
                            className={`${
                              error ? "text-red-500" : "text-gray-400"
                            }`}
                          />
                          <FormControl className="">
                            <Input
                              type="number"
                              min={0}
                              placeholder="Input your price"
                              {...field}
                              className="border-none ring-0 focus-visible:border-none focus-visible:ring-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [MozAppearance:textfield]"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => {
                    const error = form.formState.errors.discount?.message;
                    return (
                      <FormItem className="flex-1 relative">
                        <FormLabel>Discount</FormLabel>
                        <div
                          className={`border  flex items-center rounded-full focus-visible:border-themeOrange-300 focus-visible:border-[1px] focus-visible:ring-themeOrange-300 focus-visible:ring-[1px] px-2 ${
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
                  className="flex items-center gap-1 border border-themeOrange-300 py-2 px-4 rounded-full cursor-pointer text-sm text-themeOrange-300"
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

          <div className="mt-auto flex items-center gap-2 py-2">
            <SheetClose className="flex-1">
              <div className="w-full rounded-full !py-2 bg-white text-themeOrange-300 border border-themeOrange-300 hover:bg-gray-300/20">
                Cancel
              </div>
            </SheetClose>
            <Button
              type="submit"
              className="flex-2 rounded-full !py-5 bg-themeOrange-300 text-white border border-themeOrange-300 hover:bg-themeOrange-300/90"
            >
              Publish Product
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
