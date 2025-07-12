import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction as signOut } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOut}>
      <button className="flex md:py-3 py-1 md:px-5 px-2 gap-4 items-center hover:bg-primary-900 hover:text-primary-100 transition-colors text-primary-200 font-semibold w-full">
        <ArrowRightStartOnRectangleIcon className="text-primary-600 size-5" />
        <span className="hidden lg:inline">Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
