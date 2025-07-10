"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { signInWithCredentials } from "@/app/_lib/actions";
import SubmitButton from "./SubmitButton";

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async (e) => {
    if (!email || !password) return;

    try {
      const result = await signInWithCredentials({
        email,
        password,
      });

      if (result?.error) {
        alert("Wrong crendentials");
        handleReset();
        return { error: "Invalid credentials!" };
      }

      if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      action={handleSignIn}
      className="bg-primary-900 py-4 sm:py-6 px-6 sm:px-10 text-lg flex gap-6 flex-col min-w-[450px]"
    >
      {error && (
        <div className="text-red-500 text-center mb-4 font-bold tracking-wider">
          {
            <div className="flex items-center justify-center gap-2">
              <ExclamationCircleIcon className="size-10" />
              <span className="text-lg">{error}</span>
            </div>
          }
        </div>
      )}

      <div className="space-y-2">
        <label className="block">Email</label>
        <input
          type="email"
          className="form__inpt"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="block">Password</label>
        <input
          type="password"
          className="form__inpt"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <SubmitButton className="mt-4" pendingLabel="Logging in...">
        Login
      </SubmitButton>
      <Link href="/signup">
        Don&apos;t have an account yet?{" "}
        <span className="text-accent-500 underline underline-offset-2">
          Sign Up
        </span>
      </Link>
    </form>
  );
}

export default LoginForm;
