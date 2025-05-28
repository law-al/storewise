"use client";

import { Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { Form } from "../ui/form";
import { InputField } from "../ui/customs/InputField";
import UserDiaLog from "../ui/customs/UserDialog";
import { useRouter } from "next/navigation";

const setPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password too short")
      .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/\\]*$/, {
        message: "Invalid characters in password",
      }),
    confirm: z
      .string()
      .min(8, "Password too short")
      .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/\\]*$/, {
        message: "Invalid characters in password",
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"], // use string, not a variable
  });

type SetPasswordSchema = z.infer<typeof setPasswordSchema>;

export default function SetPasswordForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const form = useForm<SetPasswordSchema>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = (values: SetPasswordSchema) => {
    console.log(values);
    // Form is valid, now we can open the dialog
    setIsDialogOpen(true);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4 md:mb-8">
            <InputField
              form={form}
              type="password"
              icon={Lock}
              name="password"
              placeholder="Input your password"
            />
            <InputField
              form={form}
              type="confirm"
              icon={Lock}
              name="confirm"
              placeholder="Input your password"
            />
          </div>

          {/* Submit button instead of dialog trigger */}
          <Button
            type="submit"
            className="w-full p-5 rounded-full shadow-md bg-themeOrange-500"
          >
            Confirm
          </Button>
        </form>
      </Form>

      {/* Separate dialog that's controlled by the form submission */}

      <UserDiaLog
        config={{
          showCloseButton: false,
          preventClose: true,
          title: "Password updated succesfully",
          description: `Your password has been succesfully updated, please login first.`,
          isDialogOpen,
          handleIsDialogOpen: handleDialogOpen,
          image: {
            src: "https://img.icons8.com/ios/50/FFFFFF/checked--v1.png",
            alt: "checked--v1",
            width: 60,
            height: 60,
            classname: "rounded-full bg-green-400",
          },
          buttons: [
            {
              label: "Login",
              variant: "default",
              className: "w-full p-5 rounded-full bg-themeOrange-500",
              onClick: () => {
                router.push("/login");
              },
            },
          ],
        }}
      />
    </>
  );
}
