import { type FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { navLinks } from "@/config";
const NavBar: FC = () => {
  return (
    <nav className="py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="tracking-tight">
            <Image
              src={"/logo.png"}
              alt="logo"
              width={45}
              height={45}
              style={{ borderRadius: "50%" }}
              priority={true}
            />
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {navLinks.map((i) => (
            <Link
              key={i.link}
              href={i.link}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {i.name}
            </Link>
          ))}
          <form className="max-w-sm mx-auto">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option>Choose</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </form>
          <ThemeSwitch />
        </div>
      </div>
      <hr className="mt-5" />
    </nav>
  );
};

export default NavBar;
