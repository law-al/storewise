"use client";

import { Lock, Mail } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useState } from "react";
import { Form } from "../ui/form";
import { InputField } from "../ui/customs/InputField";
import UserDiaLog from "../ui/customs/UserDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password must be Inputed" }),
});

type LoginType = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginType) {
    console.log("Yes");
    console.log(values);
    // Form is valid, now we can open the dialog
    setIsDialogOpen(true);
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(false);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4 md:mb-8">
            <InputField form={form} type="email" icon={Mail} />
            <InputField
              form={form}
              type="password"
              inputType="password"
              icon={Lock}
              name="password"
            />
          </div>

          <Button
            type="submit"
            className="w-full p-5 rounded-full shadow-md bg-themeOrange-500"
          >
            Login
          </Button>
        </form>
      </Form>

      <UserDiaLog
        config={{
          title: "Login succesful",
          description: `Let's get started and take your store experience to the next level.`,
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
              label: "Start shift",
              variant: "default",
              className: "w-full p-5 rounded-full bg-themeOrange-500",
              onClick: () => {
                router.push("/dashboard");
                toast("Welcome to your dashboard!", {
                  description: "You can now manage your store.",
                  duration: 3000,
                });
              },
            },
          ],
        }}
      />
    </section>
  );
}

{
  /* <form onSubmit={onSubmit}>
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

{/* Submit button instead of dialog trigger */
}
{
  /* <Button
  type="submit"
  className="w-full p-5 rounded-full shadow-md bg-themeOrange-500"
>
  Login
</Button>
</form>  */
}
