"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UserDiaLog from "../ui/customs/UserDialog";
import { toast } from "sonner";

// Define zod schema for the OTP
const otpSchema = z.object({
  pin: z
    .string()
    .length(6, { message: "PIN must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function PinForm() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: OTPFormData) => {
    console.log("Submitted PIN:", data.pin);
    // Here you would handle the PIN verification
    // For example: await verifyPin(data.otp);
    setIsDialogOpen(true);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Controller
            name="pin"
            control={control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
                className="p-4 border-black"
              >
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                  <InputOTPSlot
                    index={1}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                  <InputOTPSlot
                    index={2}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                  <InputOTPSlot
                    index={3}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                  <InputOTPSlot
                    index={4}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                  <InputOTPSlot
                    index={5}
                    className="bg-white border-transparent border-none outline-none ring-transparent focus:outline-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 focus:border-none"
                  />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.pin && (
            <p className="text-sm text-red-500">{errors.pin.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full p-5 mb-3 rounded-full shadow-md bg-themeOrange-500 md:mb-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      {/* Separate dialog that's controlled by the form submission */}
      <UserDiaLog
        config={{
          title: "Congratualtions, You're all set!",
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
                  description: (
                    <span className="text-black">
                      You can now manage your store.
                    </span>
                  ),
                  duration: 3000,
                });
              },
            },
          ],
        }}
      />
    </>
  );
}
