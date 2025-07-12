// "use client"; // This for the onClick

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation ?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      disabled={isPending}
      onClick={handleDelete}
      className="flex items-center group gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors"
    >
      {isPending ? (
        <SpinnerMini className="size-5" />
      ) : (
        <TrashIcon className="size-5 text-primary-600 group-hover:text-primary-800" />
      )}{" "}
      <span className="mt-1">{isPending ? "Deleting..." : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;
