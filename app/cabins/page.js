import Filter from "../_components/Filter";
import CabinList from "../_components/CabinList";

export const metadata = {
  title: "Cabins",
};

async function page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl font-medium mb-5 text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="text-lg mb-10 text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <CabinList filter={filter} />
    </div>
  );
}

export default page;
