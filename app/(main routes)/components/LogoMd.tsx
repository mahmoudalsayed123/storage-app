import Image from "next/image";
import Link from "next/link";

const LogoMd = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        width={150}
        height={150}
        alt="logo"
        className="cursor-pointer md:ms-4 lg:ms-0"
      />
    </Link>
  );
};

export default LogoMd;
