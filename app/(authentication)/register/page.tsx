import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  const header = "Manage Inventory, Orders and Staffs - All in One Place";
  const info =
    "Streamline your operations with all-in-one dashboard. Easily manage your products, Keep track of order and Co-ordinate with your team";
  return (
    <AuthLayout bgImage="/LoginImage.png" header={header} info={info}>
      <div className="h-full flex items-center justify-center p-8">
        <div className="w-2/3">
          <h2 className="heading text-center mb-3">Create Account</h2>
          <p className="text-center mb-5 text-themeGrey-300">
            Please input to your account
          </p>

          <div className="">
            <RegisterForm />
          </div>

          <div className="text-center flex items-center gap-2 justify-center mt-3">
            <p className="">Already have an account?</p>
            <Link href="/login" className="text-themeOrange-200 ">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
