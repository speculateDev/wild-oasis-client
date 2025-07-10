"use server";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData) {
  try {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    // Log all form data
    const nationalID = formData.get("nationalID");
    const x = formData.get("nationality");
    const [nationality, countryFlag] = x.split("%");

    const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;

    if (!nationalIDRegex.test(nationalID)) {
      throw new Error("Please provide a valid national ID");
    }

    const updateData = {
      nationalID,
      countryFlag,
      nationality,
    };

    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.id);

    if (error) {
      throw new Error("Guest could not be updated");
    }

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

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
