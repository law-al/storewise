"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import {
  Clock1,
  Lock,
  LucideGlobe,
  MailIcon,
  Pen,
  Save,
  Settings,
  Trash2,
  User,
} from "lucide-react";

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserDiaLog from "@/components/ui/customs/UserDialog";
import { InputField } from "@/components/ui/customs/InputField";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SelectField from "@/components/ui/customs/SelectField";

const profileSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
});

type ProfileType = z.infer<typeof profileSchema>;

type OptionType = {
  label: string;
  options: { value: string; label: string }[];
};

const language: OptionType[] = [
  {
    label: "Language",
    options: [
      { value: "english", label: "English" },
      { value: "spanish", label: "Spanish" },
      { value: "french", label: "French" },
      { value: "german", label: "German" },
      { value: "chinese", label: "Chinese" },
    ],
  },
];

const timezone: OptionType[] = [
  {
    label: "North America",
    options: [
      { value: "america/new_york", label: "Eastern Time (ET)" },
      { value: "america/chicago", label: "Central Time (CT)" },
      { value: "america/denver", label: "Mountain Time (MT)" },
      { value: "america/los_angeles", label: "Pacific Time (PT)" },
      { value: "america/anchorage", label: "Alaska Time (AKT)" },
    ],
  },
  {
    label: "Europe",
    options: [
      { value: "europe/london", label: "London (GMT)" },
      { value: "europe/paris", label: "Paris (CET)" },
      { value: "europe/berlin", label: "Berlin (CET)" },
      { value: "europe/rome", label: "Rome (CET)" },
      { value: "europe/moscow", label: "Moscow (MSK)" },
    ],
  },
  {
    label: "Asia",
    options: [
      { value: "asia/tokyo", label: "Tokyo (JST)" },
      { value: "asia/shanghai", label: "Shanghai (CST)" },
      { value: "asia/kolkata", label: "Mumbai (IST)" },
      { value: "asia/dubai", label: "Dubai (GST)" },
      { value: "asia/singapore", label: "Singapore (SGT)" },
    ],
  },
  {
    label: "Australia",
    options: [
      { value: "australia/sydney", label: "Sydney (AEDT)" },
      { value: "australia/melbourne", label: "Melbourne (AEDT)" },
      { value: "australia/perth", label: "Perth (AWST)" },
    ],
  },
];

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function SettingsPage() {
  const router = useRouter();
  const [editProfile, setEditProfile] = React.useState<boolean>(false);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<UploadStatus>("idle");
  const avatarRef = React.useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const form = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "Fajaar",
      email: "fajaar123@gmail.com",
      password: "",
      language: "english",
      timezone: "america/new_york",
    },
  });

  function handleIsDialogOpen() {
    setIsDialogOpen(false);
  }

  function handleProfileImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    //Attend to) handle the image upload logic
    // when user uploads an image file, send to backend using FormData and collect the data which is the image URL and ID, the save to a state to be put in the form data to be submitted later

    const ACCEPTED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    try {
      if (
        e.target.files &&
        e.target.files[0] &&
        ACCEPTED_IMAGE_TYPES.includes(e.target.files[0].type)
      ) {
        const file = e.target.files[0];
        // console.log("Selected file:", file);

        setUploadStatus("uploading");

        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const imageUrl = event.target.result as string;
            setAvatar(imageUrl);
            setUploadStatus("success");

            if (avatarRef.current) {
              avatarRef.current.value = "";
            }
          } else {
            setUploadStatus("error");
          }
        };

        reader.onerror = () => {
          setUploadStatus("error");

          if (avatarRef.current) {
            avatarRef.current.value = "";
          }
        };

        reader.readAsDataURL(file);
      } else {
        throw new Error(
          "Please select a valid image file (JPEG, JPG, PNG, or WebP)"
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      setUploadStatus("error");
    }
  }

  function handleRemoveAvatar() {
    setAvatar("https://placehold.co/400/000000/FFF.png"); // Reset the avatar state

    if (avatarRef.current) {
      avatarRef.current.value = "";
    }
  }

  async function onSubmit(values: ProfileType) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a network request
    if (avatar) {
      console.log({ ...values, avatar });
    } else {
      console.log(values);
    }
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="border-2 border-gray-300 rounded-md min-h-3.5 flex flex-col gap-2 p-4">
            <div className="grid grid-cols-[1fr_3fr] p-2">
              <div className="">
                <h2 className="text-xl font-semibold">Profile</h2>
                <span className="text-xs text-gray-400">
                  Your personal information and account security settings
                </span>
              </div>
              <div className="relative">
                <Button
                  type="button"
                  variant="normal"
                  size="pill"
                  onClick={() => setEditProfile(true)}
                  className={cn(
                    "absolute top-0 right-0 opacity-100",
                    editProfile &&
                      "opacity-0 pointer-events-none transition-opacity duration-200 ease-in-out"
                  )}
                >
                  <Settings size={10} />
                  Edit Profile
                </Button>

                <div className="">
                  <div className="flex items-center gap-2">
                    {/* Image */}
                    <div className="flex flex-col items-center gap-0.5">
                      {/* <span className="text-xs">Avatar</span> */}
                      <Image
                        src={
                          avatar || "https://placehold.co/400/000000/FFF.png"
                        }
                        alt="User image"
                        width={30}
                        height={30}
                        className="rounded-full object-cover w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px] xl:w-[70px] xl:h-[70px]"
                      />
                    </div>

                    <div
                      className={cn(
                        "flex items-center gap-2 opacity-0",
                        editProfile &&
                          "opacity-100 transition-opacity duration-200 ease-in-out"
                      )}
                    >
                      <Button
                        onClick={handleRemoveAvatar}
                        type="button"
                        className="flex items-center gap-2 !px-10 py-4 text-white border rounded-full shadow-md cursor-pointer bg-themeError-500 border-themeError-300 hover:bg-themeError-500/80 shadow-background"
                      >
                        <Trash2 size={10} className="text-white" />
                        Remove
                      </Button>

                      <Button
                        type="button"
                        onClick={() => {
                          if (avatarRef.current) {
                            avatarRef.current.click();
                          }
                        }}
                        className="flex items-center gap-2 !px-10 py-4 text-gray-500 border rounded-full cursor-pointer bg-white-300 hover:bg-white-300/80 border-themeOrange-300"
                      >
                        <Pen size={10} className="text-themeOrange-300" />
                        Change
                      </Button>

                      <input
                        name="image"
                        id="image"
                        type="file"
                        accept="image/*"
                        ref={avatarRef}
                        className="hidden"
                        onChange={handleProfileImageUpload}
                      />
                    </div>
                  </div>

                  {/* PROFILE FORM */}
                  <div className="mt-4">
                    <div className="flex items-center w-full gap-2">
                      <InputField
                        form={form}
                        type="username"
                        editForm={!editProfile}
                        icon={User}
                      />

                      <InputField
                        form={form}
                        type="email"
                        editForm={!editProfile}
                        icon={MailIcon}
                      />
                    </div>

                    <div className="mt-2">
                      <InputField
                        form={form}
                        type="password"
                        editForm={!editProfile}
                        icon={Lock}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="border-2 border-gray-100" />
            {/*  */}
            <div className="grid grid-cols-[1fr_3fr] p-2">
              <div className="">
                <h2 className="text-xl font-semibold">Language & Region</h2>
                <span className="text-xs text-gray-400">
                  Customize your language and region.
                </span>
              </div>
              <div className="relative">
                <div className="flex items-center w-full gap-2">
                  <SelectField
                    form={form}
                    formSelectData={language}
                    type="language"
                    editProfile={!editProfile}
                    icon={LucideGlobe}
                  />

                  <SelectField
                    form={form}
                    formSelectData={timezone}
                    type="timezone"
                    editProfile={!editProfile}
                    icon={Clock1}
                  />
                </div>
              </div>
            </div>

            <Separator className="border-2 border-gray-100" />
            {/*  */}
            <div className="grid grid-cols-[1fr_3fr] p-2 items-center">
              <div className="">
                <h2 className="text-xl font-semibold">Danger zone</h2>
                <span className="text-xs text-gray-400">
                  Proceed with caution. These actions cannot be undone.
                </span>
              </div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    variant="danger"
                    size="pill"
                    type="button"
                  >
                    <User size={15} />
                    Delete Account
                  </Button>

                  <UserDiaLog
                    config={{
                      title: "Delete",
                      description: "Are you sure you want to delete account?",
                      isDialogOpen: isDialogOpen,
                      handleIsDialogOpen: handleIsDialogOpen,
                      image: {
                        // src: "https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded.png",
                        src: "https://img.icons8.com/ios-filled/50/FFFFFF/waste.png",
                        alt: "logout-rounded",
                        width: 40,
                        height: 40,
                        classname: "rounded-full bg-red-400",
                      },
                      buttons: [
                        {
                          label: "Cancel",
                          onClick: () => {
                            handleIsDialogOpen();
                          },
                          variant: "outline",
                          size: "pill",
                        },
                        {
                          label: "Yes delete",
                          onClick: () => {
                            // Handle logout logic here
                            router.push("/login");
                            toast("Account Deleted", {
                              className: "bg-red-500 text-white",
                              description: (
                                <span className="text-black">
                                  Your account has been deleted successfully.
                                </span>
                              ),
                              duration: 3000,
                            });
                          },
                          variant: "danger",
                          size: "pill",
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={cn("hidden", editProfile && "flex items-center")}>
              <div className=""></div>
              <div className="flex items-center gap-2 ml-auto">
                <Button
                  onClick={() => {
                    form.reset(); // Reset the form to default values
                    setEditProfile(false);
                  }}
                  type="button"
                  size="pill"
                  className="text-gray-500 bg-white border-2 border-gray-500 rounded-full cursor-pointer hover:bg-gray-100/5"
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => setEditProfile(false)}
                  variant="standard"
                  size="pill"
                  className=""
                  disabled={
                    uploadStatus === "uploading" || form.formState.isSubmitting
                  }
                >
                  <Save size={15} />
                  {uploadStatus === "uploading" ||
                  form.formState.isSubmitting ? (
                    <span>Uploading...</span>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
