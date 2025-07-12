import { updateBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

async function UpdateBookingForm({ booking, maxCapacity }) {
  const { observations, numGuests } = booking;

  const updateBookingWithId = updateBooking.bind(null, booking.id);

  return (
    <form
      action={updateBookingWithId}
      className="bg-primary-900 py-8 px-10 space-y-5"
    >
      <div className="space-y-1">
        <label className="font-semibold text-lg block">How many guests?</label>
        <select
          name="numGuests"
          defaultValue={numGuests}
          className="text-lg px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        >
          {Array.from({ length: maxCapacity }).map((_, i) => (
            <option className="text-primary-800" value={i + 1} key={i}>
              {i + 1} guest{i > 1 && "s"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1">
        <label className="font-semibold text-lg block">
          Anything we should know about your stay?
        </label>
        <input
          name="observations"
          defaultValue={observations}
          className="form__inpt"
        />
      </div>

      <div className="flex justify-end">
        <SubmitButton pendingLabel="Updating..." className="text-lg">
          Update Reservation
        </SubmitButton>
      </div>
    </form>
  );
}

export default UpdateBookingForm;
