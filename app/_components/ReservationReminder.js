"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();

  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-4 sm:px-8 sm:rounded-full rounded-2xl bg-accent-500 text-primary-800 text-xs sm:text-sm font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center min-w-[80%] xs:min-w-0 md:text-lg lg:text-xl">
      <div>
        <span>👋</span> Don&apos;t forget to reserve your dates <br />
        <p className="mt-1">
         from{" "}
          {format(new Date(range.from), "MMM dd yyyy")} to{" "}
          {format(new Date(range.to), "MMM dd yyyy")}
        </p>
      </div>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all ml-auto"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
