import AuthLayout from "@/components/AuthLayout";
import PinForm from "@/components/auth/PinForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreatePinPage() {
  const header = "Manage Inventory, Orders and Staffs - All in One Place";
  const info =
    "Streamline your operations with all-in-one dashboard. Easily manage your products, Keep track of order and Co-ordinate with your team";
  return (
    <AuthLayout bgImage="/LoginImage.png" header={header} info={info}>
      <div className="auth-section">
        <div className="w-full md:w-2/3">
          <h2 className="heading-lg text-center mb-1 md:mb-3">
            Create Account
          </h2>
          <p className="text-sm md:text-[18px] text-center mb-5 text-themeGrey-300">
            Please input to your account
          </p>

          <div className="">
            <PinForm />
          </div>

          <div className="text-center flex items-center justify-center text-sm md:text-[18px]">
            <Link href="/register" className="flex items-center gap-2">
              <ArrowLeft size={20} className="font-light" />
              <p>Back</p>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
