"use client";
import { Button } from "@/components/ui/button";
import LogoContextProvider, { useLogo } from "@/context/StoreSettings";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";

const MAX_FILE_SIZE = 1; //MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_DIMENSION = { width: 160, height: 160 };

type OptionType = {
  label: string;
  options: { value: string; label: string }[];
};

const themes: OptionType[] = [
  {
    label: "Theme",
    options: [
      {
        value: "light",
        label: "Light",
      },
      {
        value: "dark",
        label: "Dark",
      },
      {
        value: "system",
        label: "System",
      },
    ],
  },
];

function LogoChange() {
  const { logo, setLogo, theme, setTheme } = useLogo();
  const [uploadError, setUploadError] = useState("");
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [previewTheme, setPreviewTheme] = useState<string>(theme || "light");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewTheme(theme || "light");
  }, [theme]);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const isValidDimension =
          img.width <= MAX_DIMENSION.width &&
          img.height <= MAX_DIMENSION.height;
        resolve(isValidDimension);
        // Clean up the object URL
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        resolve(false);
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError("");
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeInMB = Math.round((file.size / (1024 * 1024)) * 100) / 100;
    const isSizeOkay = fileSizeInMB <= MAX_FILE_SIZE;

    const isTypeOkay = ACCEPTED_IMAGE_TYPES.includes(file.type);

    if (!isSizeOkay) {
      setUploadError(`File size must be less than ${MAX_FILE_SIZE}MB`);
      resetFileInput();
      return;
    }

    if (!isTypeOkay) {
      setUploadError("Please select a valid image file (JPEG, PNG, or WebP)");
      resetFileInput();
      return;
    }

    const isValidDimension = await validateImage(file);
    if (!isValidDimension) {
      setUploadError(
        `Image dimensions must be ${MAX_DIMENSION.width}x${MAX_DIMENSION.height} or smaller`
      );
      resetFileInput();
      return;
    }

    // Clean up previous preview URL
    if (previewLogo) {
      URL.revokeObjectURL(previewLogo);
    }

    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewLogo(imageUrl);
  }

  const resetFileInput = () => {
    if (logoRef.current) {
      logoRef.current.value = "";
    }
  };

  // Check if there are any pending changes
  const hasChanges = previewLogo !== null || previewTheme !== theme;

  // Handle the update button click
  const handleUpdate = () => {
    if (previewLogo) {
      setLogo(previewLogo);
    }
    if (previewTheme !== theme) {
      setTheme(previewTheme);
    }

    // Reset preview states
    setPreviewLogo(null);
    setSelectedFile(null);
    resetFileInput();
  };

  // Function to cancel the preview
  const handleCancel = () => {
    // Clean up preview URL
    if (previewLogo) {
      URL.revokeObjectURL(previewLogo);
    }

    setPreviewLogo(null);
    setPreviewTheme(theme || "light");
    setSelectedFile(null);
    setUploadError("");
    resetFileInput();
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (previewLogo) {
        URL.revokeObjectURL(previewLogo);
      }
    };
  }, [previewLogo]);

  return (
    <>
      <h3 className="font-medium">Logo</h3>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600">
          160 x 160 (1:1) recommended. 1mb max file size.
        </p>
        <div className="flex items-center gap-1">
          <div className="relative flex items-center justify-center w-20 h-20 bg-gray-100 border border-gray-200 rounded-md">
            {previewLogo ? (
              <>
                <Image
                  src={previewLogo}
                  alt="Logo preview"
                  className="object-contain w-full h-full rounded-md"
                  width={80}
                  height={80}
                />
                <div className="absolute px-1 text-xs text-white bg-yellow-500 rounded -top-1 -right-1">
                  Preview
                </div>
              </>
            ) : logo ? (
              <Image
                src={logo}
                alt="Logo"
                className="object-contain w-full h-full rounded-md"
                width={80}
                height={80}
              />
            ) : (
              <div className="text-xs text-center text-gray-400">No logo</div>
            )}
          </div>

          <Button
            variant="normal"
            size="pill"
            type="button"
            onClick={() => {
              if (logoRef.current) {
                logoRef.current.click();
              }
            }}
            className="text-gray-500 bg-white hover:bg-gray-100/20"
          >
            Change
          </Button>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={logoRef}
            style={{ display: "none" }}
          />
        </div>
      </div>

      {uploadError && (
        <div className="p-2 mt-2 text-sm text-red-600 rounded bg-red-50">
          {uploadError}
        </div>
      )}

      <div className="mt-4 mb-4">
        <h3 className="mb-2 font-medium">Theme</h3>
        <Select value={previewTheme} onValueChange={setPreviewTheme}>
          <SelectTrigger className="w-full p-5 rounded-full">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((themeGroup) => (
              <SelectGroup key={themeGroup.label}>
                <SelectLabel className="mb-2">{themeGroup.label}</SelectLabel>
                {themeGroup.options.map((option, i) => (
                  <SelectItem key={i} value={option.value}>
                    {option.value.charAt(0).toUpperCase() +
                      option.value.slice(1)}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
        <span className="block mt-1 text-sm text-gray-500">
          Choose a theme for your store. Style can be customized
        </span>
      </div>

      {/* Only show buttons when there are changes */}
      {hasChanges && (
        <div className="flex flex-col gap-2">
          <Button onClick={handleUpdate} variant="standard" size="pill">
            Save changes
          </Button>
          <Button
            onClick={handleCancel}
            variant="normal"
            size="pill"
            className="p-2 text-gray-500 bg-white hover:bg-gray-200"
          >
            Reset
          </Button>
        </div>
      )}
    </>
  );
}

export default function LogoUpload() {
  return (
    <LogoContextProvider>
      <LogoChange />
    </LogoContextProvider>
  );
}
