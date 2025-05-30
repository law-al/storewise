import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/form/LoginForm";
import LoginLink from "@/components/features/auth/LoginLink";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function LoginPage() {
  const header = "Welcome to StoreWise- Your smartstore management solution";
  const info =
    "Effortlessly manage your store with powerful tools designed to boost productivity and increase sales. From inventory tracking to detailed sales analytics.";
  return (
    <AuthLayout bgImage="/LoginImage.png" header={header} info={info}>
      <div className="auth-section">
        <div className="w-full md:w-2/3">
          <h2 className="mb-1 text-center heading-lg md:mb-3">Hi, Welcome</h2>
          <p className="text-sm md:text-[18px] text-center mb-5 text-themeGrey-300">
            Please login to an employee account
          </p>

          <div className="flex flex-col items-center gap-2 mb-5 md:flex-row md:gap-5">
            <LoginLink logo="Google" />
            <LoginLink logo="Apple" />
          </div>

          <div className="flex items-center gap-2 mb-2 md:mb-5">
            <div className="flex-1 border border-themeGrey-50"></div>
            <div className=" text-center text-themeGrey-200 text-sm md:text-[18px]">
              Sign in
            </div>
            <div className="flex-1 border border-themeGrey-50"></div>
          </div>

          <div className="">
            <LoginForm />
          </div>

          <div className="flex items-center justify-between mt-3 text-sm md:text-sm">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                className="data-[state=checked]:bg-themeOrange-300 data-[state=checked]:border-themeOrange-300 border-themeOrange-300 focus:themeOrange-300"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <div className="">
              <Link
                href="/forget-password"
                className="text-sm transition-all duration-200 hover:text-themeOrange-300"
              >
                Forgot password ?
              </Link>
            </div>
          </div>

          <div className="text-center flex items-center gap-2 justify-center mt-3 text-sm md:text-[18px]">
            <p className="">Don&apos;t have an account?</p>
            <Link href="/register" className="text-themeOrange-200">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
