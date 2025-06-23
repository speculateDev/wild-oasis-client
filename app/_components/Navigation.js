import Link from "next/link";

function Navigation() {
  return (
    <nav className="z-10 text-sm sm:text-xl">
      <ul className="flex gap-4 sm:gap-16 items-center">
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/cabins"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
            href="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-accent-400 transition-colors"
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
