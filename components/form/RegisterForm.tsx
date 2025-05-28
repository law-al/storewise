"use client";

import { Lock, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import InputField from "../ui/InputField";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { InputField } from "../ui/customs/InputField";

const registerSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Must be greater than 3 characters" }),
  lastname: z.string().min(3, { message: "Must be greater than 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be Inputed" }),
});

type RegisterType = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  // const [isPinPageOpen, setIsPinPageOpen] = useState(false);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterType) => {
    console.log(values);
    // Form is valid, now we can open the dialog
    router.push("/create-pin");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-4 md:mb-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            <InputField
              form={form}
              type="firstname"
              icon={User}
              placeholder="Input your firstname"
            />

            <InputField
              form={form}
              type="lastname"
              icon={User}
              placeholder="Input your lastname"
            />
          </div>

          <InputField
            form={form}
            type="email"
            inputType="email"
            icon={Mail}
            placeholder="user@gmail.com"
          />

          <InputField
            form={form}
            type="password"
            inputType="password"
            icon={Lock}
            name="password"
            placeholder="your password"
          />
        </div>

        {/* Submit button instead of dialog trigger */}
        <Button
          type="submit"
          className="w-full p-5 rounded-full shadow-md bg-themeOrange-500"
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}
