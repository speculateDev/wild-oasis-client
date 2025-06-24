export const metadata = {
  title: "Reservations",
};

function page() {
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      <p className="text-lg">You have no reservations yet. Check out our</p>

      <a href="/cabins" className="underline text-accent-500">
        luxury cabins &rarr;
      </a>
    </div>
  );
}

export default page;
