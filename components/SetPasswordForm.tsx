"use client";

import { Lock } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { Button } from "./ui/button";
import { useState } from "react";
import AuthDiaLog from "./AuthDialog";

const schema = z
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

type Input = z.infer<typeof schema>;

const dialogContent = {
  title: "Password updated succesfully",
  content: `Your password has been succesfully updated, please login first`,
  href: "/login",
};

export default function SetPasswordForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("Yes");
    console.log(data);
    // Form is valid, now we can open the dialog
    setIsDialogOpen(true);
  });

  const handleDialogOpen = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 mb-4 md:mb-8">
          <InputField
            label="password"
            type="password"
            register={register}
            name="password"
            icon={<Lock className="text-themeGrey-200" />}
            error={errors.password?.message}
            placeholder="Input your password"
          />
          <InputField
            label="Confirm password"
            type="password"
            register={register}
            name="confirm"
            icon={<Lock className="text-themeGrey-200" />}
            error={errors.confirm?.message}
            placeholder="Input to confirm password"
          />
        </div>

        {/* Submit button instead of dialog trigger */}
        <Button
          type="submit"
          className="w-full rounded-full bg-themeOrange-500 p-5 shadow-md"
        >
          Confirm
        </Button>
      </form>

      {/* Separate dialog that's controlled by the form submission */}
      <AuthDiaLog
        isDialogOpen={isDialogOpen}
        handleDialogOpen={handleDialogOpen}
        dialogContent={dialogContent}
      />
    </>
  );
}
