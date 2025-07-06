import Image from "next/image";
import TextExpander from "./TextExpander";
import { UsersIcon, MapPinIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800 px-10 mb-24 py-3 gap-20">
      <div className="relative scale-[1.15] md:-translate-x-3 aspect-square md:aspect-auto">
        <Image
          fill
          src={cabin.image}
          alt={"Cabin " + cabin.name}
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="text-accent-100 font-black p-6 bg-primary-950 -translate-x-8 md:translate-x-[-254px] text-5xl sm:text-7xl pb-1 mb-6 md:mb-0 w-[120%] sm:w-[150%]">
          Cabin {name}
        </h3>

        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="size-5 text-primary-700" />
            <span className="text-lg">For up to {maxCapacity} guests</span>
          </li>

          <li className="flex gap-3 items-center">
            <MapPinIcon className="size-5 text-primary-700" />
            <span className="text-lg">
              Located in the heart of the Dolomities (Italy)
            </span>
          </li>

          <li className="flex items-center gap-3">
            <EyeSlashIcon className="size-5 text-primary-700" />
            <span>
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
