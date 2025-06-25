import Link from "next/link";

function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1>This cabin could not be found :(</h1>

      <Link
        href="/cabins"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back to all Cabins
      </Link>
    </main>
  );
}

export default NotFound;
