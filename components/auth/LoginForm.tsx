"use client";

import { Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../ui/InputField";
import { Button } from "../ui/button";
import { useState } from "react";
import AuthDiaLog from "../AuthDialog";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be Inputed" }),
});

type Input = z.infer<typeof schema>;

const dialogContent = {
  title: "Login succesful",
  content: `Let's get started and take your store experience to the next level.`,
  href: "/home",
};

export default function LoginForm() {
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
            label="email"
            type="email"
            register={register}
            name="email"
            icon={<Mail className="text-themeGrey-200" />}
            error={errors.email?.message}
            placeholder="Input your email"
          />
          <InputField
            label="password"
            type="password"
            register={register}
            name="password"
            icon={<Lock className="text-themeGrey-200" />}
            error={errors.password?.message}
            placeholder="Input your password"
          />
        </div>

        {/* Submit button instead of dialog trigger */}
        <Button
          type="submit"
          className="w-full rounded-full bg-themeOrange-500 p-5 shadow-md"
        >
          Login
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
