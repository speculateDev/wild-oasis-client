import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import ReservationsList from "@/app/_components/ReservationsList";

export const metadata = {
  title: "Reservations",
};

async function page() {
  const session = await auth();
  const bookings = await getBookings(session?.user?.id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings?.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our
          <a href="/cabins" className="underline text-accent-500">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </div>
  );
}

export default page;
