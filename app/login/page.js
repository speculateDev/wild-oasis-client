import LoginForm from "../_components/LoginForm.js";
import Socials from "../_components/Socials.js";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center -mt-5">
      <h2 className="text-3xl font-semibold text-center">
        Sign in to access your guest area
      </h2>

      <LoginForm />
      <Socials />
    </div>
  );
}
