import UpdateBookingForm from "@/app/_components/UpdateBookingForm";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update booking",
};

async function page({ params }) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);

  const { maxCapacity } = await getCabin(booking.cabinId);

  return (
    <div className="space-y-6">
      <h2 className="text-accent-400 text-3xl font-semibold">
        Edit reservation #{bookingId}
      </h2>
      <UpdateBookingForm booking={booking} maxCapacity={maxCapacity} />
    </div>
  );
}

export default page;
