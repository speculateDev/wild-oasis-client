import Link from "next/link";
import { auth } from "@/app/_lib/auth";

async function Navigation() {
  const session = await auth();

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
          {session?.user?.name ? (
            <Link
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
              href="/account"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image || "/default-profile.jpg"}
                alt="User profile"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              className="hover:text-accent-400 transition-colors"
              href="/account"
            >
              {" "}
              <span>Guest area</span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
