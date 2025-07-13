import { signInAction as signIn } from "../_lib/actions";

function SignInButton({ provider, children }) {
  return (
    <form action={signIn.bind(null, provider)}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-4 md:px-10 py-4 font-medium">
        {children}
      </button>
    </form>
  );
}

export default SignInButton;
