"use client";

import { Lock, Mail, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import { Button } from "./ui/button";
import { useState } from "react";
import AuthDiaLog from "./AuthDialog";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstname: z
    .string()
    .min(3, { message: "Must be greater than 3 characters" }),
  lastname: z.string().min(3, { message: "Must be greater than 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be Inputed" }),
});

type Input = z.infer<typeof schema>;

const dialogContent = {
  title: "Login succesful",
  content: `Let's get started and take your store experience to the next level.`,
  href: "/home",
};

export default function RegisterForm() {
  const router = useRouter();
  // const [isPinPageOpen, setIsPinPageOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // Form is valid, now we can open the dialog
    router.push("/create-pin");
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-4">
            <InputField
              label="firstname"
              register={register}
              name="firstname"
              icon={<User className="text-themeGrey-200" />}
              error={errors.firstname?.message}
              placeholder="input your firstname"
            />

            <InputField
              label="lastname"
              register={register}
              name="lastname"
              icon={<User className="text-themeGrey-200" />}
              error={errors.lastname?.message}
              placeholder="input your lastname"
            />
          </div>

          <InputField
            label="email"
            type="email"
            register={register}
            name="email"
            icon={<Mail className="text-themeGrey-200" />}
            error={errors.email?.message}
            placeholder="user@gmail.com"
          />
          <InputField
            label="password"
            type="password"
            register={register}
            name="password"
            icon={<Lock className="text-themeGrey-200" />}
            error={errors.password?.message}
            placeholder="your password"
          />
        </div>

        {/* Submit button instead of dialog trigger */}
        <Button
          type="submit"
          className="w-full rounded-full bg-themeOrange-500 p-5 shadow-md"
        >
          Continue
        </Button>
      </form>
    </>
  );
}
