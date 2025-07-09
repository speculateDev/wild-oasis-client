import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { auth } from "@/app/_lib/auth";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { cabinId: id } = params;
  const { name } = await getCabin(id);

  return { title: `Cabin ${name}` };
}

// export const revalidate = 0;

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

async function page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const session = await auth();

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-center text-accent-400 text-4xl md:text-5xl font-semibold mb-10">
          Reserve {cabin?.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} user={session?.user} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
