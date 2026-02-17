import Image from "next/image";
import Link from "next/link";

const LogoSm = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/icons/logo-brand.svg"
        width={50}
        height={50}
        alt="logo"
        className="cursor-pointer"
      />
    </Link>
  );
};

export default LogoSm;
