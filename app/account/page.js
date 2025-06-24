export const metadata = {
  title: "Guest area",
};

async function page() {
  // const session = await auth();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {"firstname"}
    </h2>
  );
}

export default page;
