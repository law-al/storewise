import Image from "next/image";
import Link from "next/link";

export default function LoginLink({ logo }: { logo: string }) {
  return (
    <Link
      href="/"
      className="p-2 w-full md:flex-1/2 flex items-center justify-center border border-themeGrey-100 gap-2 rounded-full hover:border-themeGrey-300 transition-all duration-200"
    >
      <Image src={`/${logo}.png`} alt={`${logo} logo`} width={32} height={32} />
      <p className="font-semibold">Sign in with {logo}</p>
    </Link>
  );
}
