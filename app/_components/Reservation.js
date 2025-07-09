import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";

async function Reservation({ cabin }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        bookedDates={bookedDates}
        cabin={cabin}
        settings={settings}
      />

      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
