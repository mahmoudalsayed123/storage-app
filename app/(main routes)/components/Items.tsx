"use client";
import Link from "next/link";
import { items } from "../../constants/index";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Items = () => {
  const pathName = usePathname();
  return (
    <div className="mt-[30px] pb-4">
      <ul>
        {items.map((item) => (
          <Link
            key={item.name}
            href={`${item.path}`}
            className="flex md:justify-start items-center w-full"
          >
            <li
              className={cn(
                pathName === item.path &&
                  " shadow-xl/30  cursor-pointer bg-black text-white",
                "w-[300px] md:w-full flex items-center gap-4 px-5 py-2 mb-4 rounded-full transition-all duration-300 cursor-pointer",
              )}
            >
              <div>
                <Image
                  src={`${item.icon}`}
                  width={30}
                  height={30}
                  alt={item.name}
                  className={cn(
                    "nav-icon",
                    pathName === item.path && "nav-icon-active",
                  )}
                />
              </div>
              <p className="text-[18px] font-bold text-center">{item.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Items;
