import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-primary-800">
      <div className="flex-1 relative">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-r border-primary-900 max-w-[200px] xs:max-w-none"
        />
      </div>

      <div className="xs:flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-lg sm:text-2xl text-accent-500 font-semibold">
            Cabin {cabin.name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UserIcon className="size-5 text-primary-600" />
            <p className="text-md sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity} </span> guests
            </p>
          </div>

          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-lg sm:text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through text-primary-600 font-semibold">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-3xl font-[350]">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-primary-800 flex justify-end">
          <Link
            href={`/cabins/${id}`}
            className="text-sm sm:text-base py-2 sm:py-4 px-4 sm:px-6 border-l border-primary-800 hover:bg-accent-600 hover:text-primary-900 transition-all inline-block"
          >
            Details & reservations &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
