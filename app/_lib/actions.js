"use server";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getBookings } from "./data-service";

export async function updateProfile(formData) {
  try {
    const session = await auth();
    if (!session) throw new Error("You must be logged in");

    const img = formData.get("profile");

    const nationalID = formData.get("nationalID");

    // Extract the nationality and flag from the combo
    const x = formData.get("nationality");
    const [nationality, countryFlag] = x.split("%");

    const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;

    if (nationalID && !nationalIDRegex.test(nationalID)) {
      throw new Error("Please provide a valid national ID");
    }

    const updateData = {
      nationalID,
      countryFlag,
      nationality,
    };

    if (img) {
      updateData.image = img;
    }

    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("id", session.user.id);

    if (error) {
      throw new Error("Guest could not be updated");
    }

    revalidatePath("/account/profile");
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { cabinId, startDate, endDate, numNights, cabinPrice } = bookingData;

  if (!bookingData.startDate || !bookingData.endDate || isNaN(numNights)) {
    throw new Error("Invalid date range");
  }

  if (isNaN(cabinPrice)) {
    throw new Error("Invalid cabin price");
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    totalPrice: cabinPrice,
    startDate,
    endDate,
    extrasPrice: 0,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.log(error);
    throw new Error("Booking could not be created");
  }

  // Generate token (to only )
  const token = Math.random().toString(36).substring(2, 15);
  cookies().set("thankyou", token, { maxAge: 90 });

  revalidatePath(`/cabins/${cabinId}`);
  redirect(`/cabins/thankyou?token=${token}`);
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Check if the booking is relevant to the signed in user
  const guestBookings = await getBookings(session?.user?.id);
  const guestBookingsIds = guestBookings.map((b) => b.id);

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservation");
}

export async function updateBooking(bookingId, formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Only allow personal bookings mutation
  const guestBooking = await getBookings(session.user.id);
  const bookingsIds = guestBooking.map((b) => b.id);

  if (!bookingsIds.includes(bookingId)) {
    throw new Error("Your are not allowed to update this booking");
  }

  const observations = formData.get("observations").slice(0, 1000);
  const numGuests = Number(formData.get("numGuests"));

  const updateData = {
    observations,
    numGuests,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId);

  if (error) {
    throw new Error("Failed to update booking");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

///////////////////////
///////////////////////
//////// Auth
export async function signInWithCredentials(credentials) {
  const { email, password } = credentials;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { ok: true };
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid credentials" };
    } else {
      return { error: "An unexpected error occurred. Please try again later." };
    }
  }
}

export async function signInAction(provider) {
  await signIn(provider, { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
