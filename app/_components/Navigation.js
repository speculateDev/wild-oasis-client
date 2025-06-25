"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="z-10 text-sm sm:text-xl">
      <ul className="flex gap-4 sm:gap-16 items-center">
        <li>
          <Link
            className={`hover:text-accent-400 transition-colors ${
              pathname.includes("/cabins") ? "text-accent-400" : ""
            }`}
            href="/cabins"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            className={`hover:text-accent-400 transition-colors ${
              pathname === "/about" ? "text-accent-400" : ""
            }`}
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`hover:text-accent-400 transition-colors ${
              pathname === "/account" ? "text-accent-400" : ""
            }`}
            href="/account"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
