import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import {
  Copy,
  Delete,
  DeleteIcon,
  LucideEye,
  MoreHorizontal,
  MoreVertical,
  Pen,
  Share,
} from "lucide-react";
import { Switch } from "../../ui/switch";
import { Products } from "@/lib/data";

export default function ProductDropdown({
  orientation = "vertical",
  product,
  handleAvailable,
}: {
  orientation?: "vertical" | "horizontal";
  product: Products;
  handleAvailable: (available: boolean, id: string) => void;
}) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-full cursor-pointer">
          {orientation === "vertical" ? (
            <MoreVertical size={15} />
          ) : (
            <MoreHorizontal size={15} />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={2}
          align="end"
          alignOffset={50}
          side="bottom"
          className=""
        >
          <DropdownMenuItem className="flex items-center gap-3 font-medium">
            <Pen />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 font-medium">
            <Share />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 font-medium">
            <LucideEye />
            Preview
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 font-medium">
            <div className="flex items-center gap-3">
              <Delete />
              Availability
            </div>

            <Switch
              checked={product.available}
              id={product.productId}
              onClick={() =>
                handleAvailable(product.available, product.productId)
              }
              className={`${
                product.available ? "!bg-themeOrange-300" : "!bg-gray-300"
              } cursor-pointer`}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 font-medium">
            <Copy />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 font-medium text-red-400">
            <DeleteIcon className="text-red-400" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
