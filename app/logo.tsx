import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200">
      <Image
        src="/logo.jpg"
        alt="Kalpabriksh Logo"
        width={3133}
        height={1180}
        className="h-14 w-auto max-w-xs object-contain"
        priority
        quality={85}
      />
    </Link>
  );
};
