// import { unstable_noStore as noStore } from "next/cache";

import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

export default async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 7);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}
