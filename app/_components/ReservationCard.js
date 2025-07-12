import Link from "next/link";
import Image from "next/image";
import { format, formatDate, formatDistance, isPast, isToday } from "date-fns";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(new Date(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    numNights,
    startDate,
    endDate,
    totalPrice,
    numGuests,
    created_at,
    cabins: { image, name },
  } = booking;

  return (
    <div className="flex border border-primary-800">
      <div className="relative aspect-square h-32">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover border-r border-primary-800"
        />
      </div>

      <div className="flex-grow px-6 py-3 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>

          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md">
              Past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-md">
              Upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300">
          Booked {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl font-semibold text-accent-500">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(totalPrice)}
          </p>

          <p className="text-primary-300">&bull;</p>
          <p className="text-primary-300 text-lg">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-primary-400 text-sm">
            Booked {formatDate(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Edit and delete */}
      {!isPast(startDate) && (
        <div className="flex flex-col border-l border-primary-800 w-[100px]">
          <Link
            className="flex items-center group gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            href={`/account/reservations/edit/${id}`}
          >
            <PencilSquareIcon className="size-5 text-primary-600 group-hover:text-primary-800" />
            <span className="mt-1">Edit</span>
          </Link>

          <DeleteReservation onDelete={onDelete} bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
