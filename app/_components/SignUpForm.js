"use client";

import Link from "next/link";
import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import SubmitButton from "./SubmitButton";
import Socials from "./Socials";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "../_lib/actions";

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSignUp = async () => {
    setError(null);

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create a guest");
      }

      const result = await signInWithCredentials({ email, password });

      if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h3 className="text-center text-3xl font-semibold mb-4 -mt-6">
        Sign up to reserve cabins
      </h3>

      <form
        action={handleSignUp}
        className="bg-primary-900 py-4 sm:py-6 px-6 sm:px-10 text-lg flex gap-6 flex-col max-w-lg mx-auto"
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
          <label className="block">Full Name</label>
          <input
            className="form__inpt"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
        <SubmitButton className="mt-4" pendingLabel="Signing Up...">
          Sign Up
        </SubmitButton>

        <Link href="/login">
          Already have an account?{" "}
          <span className="text-accent-500 underline underline-offset-2">
            Login
          </span>
        </Link>
      </form>

      <div className="flex justify-center mt-6">
        <Socials />
      </div>
    </>
  );
}

export default SignUpForm;
