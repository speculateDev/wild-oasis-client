"use server";
import { signIn, signOut } from "@/app/_lib/auth";

export async function signInAction(provider) {
  await signIn(provider);
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
