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
    <section className="w-full border border-red-300 h-screen flex">
      <div
        className="flex-1 h-full flex flex-col p-4"
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[85%] mt-auto">
          <h1 className="heading-xl tracking-wide text-themeOrange-400">
            {header}
          </h1>
          <p className="text-xl tracking-wide leading-relaxed">{info}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}
