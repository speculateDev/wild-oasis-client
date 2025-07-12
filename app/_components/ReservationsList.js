"use client";

import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";

function ReservationsList({ bookings }) {
  function handleDelete(bookingId) {
    // optimisticDelete(bookingId);
    deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard
          key={booking.id}
          onDelete={handleDelete}
          booking={booking}
        />
      ))}
    </ul>
  );
}

export default ReservationsList;
