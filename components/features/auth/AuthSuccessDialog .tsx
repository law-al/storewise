import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import Image from "next/image";
import Link from "next/link";

type DialogContent = {
  title: string;
  content: string;
  href: string;
};

export default function AuthSucessDialog({
  isDialogOpen,
  handleDialogOpen,
  dialogContent,
}: {
  isDialogOpen: boolean;
  handleDialogOpen: () => void;
  dialogContent: DialogContent;
}) {
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="flex items-center">
            <div className="mb-2">
              <Image
                src="/checkmark.png"
                alt="checkmark icon"
                width={80}
                height={80}
              />
            </div>
            <DialogTitle className="mb-2">{dialogContent.title}</DialogTitle>
            <DialogDescription className="mb-3 text-sm text-center">
              {dialogContent.content}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              asChild
              onClick={handleDialogOpen}
              className="w-full p-5 rounded-full bg-themeOrange-500"
            >
              <Link href={dialogContent.href}>
                {dialogContent.href === "/login" ? "Login" : "Start shift"}
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
