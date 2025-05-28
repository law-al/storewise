import AuthLayout from "@/components/layout/AuthLayout";
import SetPasswordForm from "@/components/form/SetPasswordForm";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDashIcon } from "lucide-react";
import Link from "next/link";

export default function SetPasswordPage() {
  const header = "Manage Inventory, Orders and Staffs - All in One Place";
  const info =
    "Streamline your operations with all-in-one dashboard. Easily manage your products, Keep track of order and Co-ordinate with your team";
  return (
    <AuthLayout bgImage="/LoginImage.png" header={header} info={info}>
      <div className="auth-section">
        <div className="w-full md:w-2/3">
          <div className="">
            <Button asChild variant={"outline"} className="">
              <Link href="/login">
                <ArrowBigLeftDashIcon />
              </Link>
            </Button>
          </div>

          <div className="">
            <h2 className="heading-lg text-center mb-1 md:mb-3">
              Forgot Password?
            </h2>
            <p className="text-sm md:text-[18px] text-center mb-5 text-themeGrey-300">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>

          <div className="">
            <SetPasswordForm />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
