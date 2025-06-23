import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <div>
      <Navigation />
      <h1 className="">Hello Next!</h1>
    </div>
  );
  return (
    <main className="mt-24">
      <Image
        fill
        quality={80}
        src={bg}
        alt="Mountains and forests with two cabins"
        className="object-cover object-top"
        placeholder="blur"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to Paradise.
        </h1>

        <Link
          href="/cabins"
          className="bg-accent-500 px-5 py-4 sm:px-8 sm:py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
