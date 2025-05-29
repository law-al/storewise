import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

// Dialog for Delete Confirmation
type DialogButton = {
  label: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "normal"
    | "standard"
    | "danger"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "pill";
  className?: string;
  loading?: boolean;
  disabled?: boolean;
};

type DialogProps = {
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    classname?: string;
    width?: number;
    height?: number;
  };
  buttons: DialogButton[];
  isDialogOpen?: boolean;
  handleIsDialogOpen?: () => void;
  showCloseButton?: boolean;
  preventClose?: boolean;
};

export default function UserDiaLog({ config }: { config: DialogProps }) {
  const {
    title,
    description,
    image,
    buttons,
    isDialogOpen,
    handleIsDialogOpen,
    showCloseButton = true,
    preventClose = false,
  } = config;
  return (
    <Dialog open={isDialogOpen} onOpenChange={handleIsDialogOpen}>
      <DialogContent
        onInteractOutside={preventClose ? (e) => e.preventDefault() : undefined}
        className="sm:max-w-[425px]"
      >
        {showCloseButton && (
          <DialogClose asChild>
            <button
              className="absolute transition-opacity rounded-sm top-4 right-4 opacity-70 ring-offset-background hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        )}
        <div className="grid gap-4 py-4"></div>

        <DialogHeader className="flex items-center">
          <div
            className={cn(
              "mb-2 w-[80px] h-[80px] flex items-center justify-center rounded-full",
              image?.classname
            )}
          >
            <Image
              src={image?.src || "/checkmark.png"}
              alt={image?.alt || "checkmark icon"}
              width={image?.width || 80}
              height={image?.height || 80}
              className={cn()}
            />
          </div>
          <DialogTitle className="mb-2">{title}</DialogTitle>
          <DialogDescription className="mb-3 text-sm text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center w-full gap-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                variant={button.variant || "default"}
                className={cn(
                  "flex-1 p-5 rounded-full",
                  button.className || ""
                )}
                disabled={button.disabled || false}
              >
                {button.loading ? "Loading..." : button.label}
              </Button>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
