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
import AuthDialog from "../AuthDialog";

// Define zod schema for the OTP
const otpSchema = z.object({
  pin: z
    .string()
    .length(6, { message: "PIN must be exactly 6 digits" })
    .regex(/^\d+$/, { message: "PIN must contain only numbers" }),
});

type OTPFormData = z.infer<typeof otpSchema>;

const dialogContent = {
  title: "Congratulation, You're In",
  content: `Let's get started and take your store experience to the next level.`,
  href: "/home",
};

export default function PinForm() {
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
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />

          {errors.pin && (
            <p className="text-red-500 text-sm">{errors.pin.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-full bg-themeOrange-500 p-5 shadow-md mb-3 md:mb-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Account"}
        </Button>
      </form>

      {/* Separate dialog that's controlled by the form submission */}
      <AuthDialog
        isDialogOpen={isDialogOpen}
        handleDialogOpen={handleDialogOpen}
        dialogContent={dialogContent}
      />
    </>
  );
}
