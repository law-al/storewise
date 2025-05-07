import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
  bgImage,
  header,
  info,
}: {
  children: React.ReactNode;
  bgImage: string;
  header: string;
  info: string;
}) {
  return (
    <section className="w-full border border-red-300 h-screen flex flex-col md:flex-row">
      <div
        className="flex-1 h-full  flex-col p-4 hidden md:flex"
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full md:w-[85%] mt-auto">
          <h1 className="heading-xl tracking-wide text-themeOrange-400">
            {header}
          </h1>
          <p className="text-xl tracking-wide leading-relaxed">{info}</p>
        </div>
      </div>

      <Link
        href="/"
        className="flex items-center justify-center gap-2 mb-3 md:hidden"
      >
        <Image
          src="/logo-png.png"
          alt="logo"
          width={40}
          height={40}
          className=""
        />
        <span className="heading-sm">Storewise</span>
      </Link>

      <div className="flex-1">{children}</div>
    </section>
  );
}
