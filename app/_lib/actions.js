"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function signInWithCredentials(credentials) {
  const { email, password } = credentials;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
      redirect: false,
    });

    return { ok: true };
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("An unexpected error occurred. Please try again later.");
    }
  }
}

export async function signInAction(provider) {
  await signIn(provider);
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
