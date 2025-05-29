"use client";

import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { InputField } from "../ui/customs/InputField";

const mailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type MailType = z.infer<typeof mailSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();

  const form = useForm<MailType>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: MailType) => {
    console.log("yes");
    console.log(values);
    // Form is valid, now we can open the dialog
    router.push("/verify-otp");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 mb-4 md:mb-8">
          <InputField
            form={form}
            type="email"
            icon={Mail}
            inputType="email"
            placeholder="Input your email"
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
