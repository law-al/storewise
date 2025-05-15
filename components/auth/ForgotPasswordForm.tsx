"use client";

import { Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type Input = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log("yes");
    console.log(data);
    // Form is valid, now we can open the dialog
    router.push("/verify-otp");
  });

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
