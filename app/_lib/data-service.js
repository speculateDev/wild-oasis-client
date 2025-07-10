import { notFound } from "next/navigation";
import { supabase } from "./supabase";
import { eachDayOfInterval } from "date-fns";

//////////////
///// Cabin

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

/////////////////////////
/////////////////////////
////// Booking

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getBookings(guestId) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

//////////////////////////////////////////////
//////////////////////////////////////////////
///// Guests

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function getGuest(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

//////////////////////////////////////////////
//////////////////////////////////////////////
///// Utils

export async function getSettings() {
  const { data, error } = await supabase.from("Settings").select("*").single();

  // await new Promise((resolve, reject) => setTimeout(resolve, 6000));

  if (error) {
    console.error();
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const data = require("@/db.json");

    // const res = await fetch(
    //   "https://restcountries.com/v2/all?fields=name,flag"
    // );
    // const countries = res.json();

    return data.countries;
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch countries");
  }
}
