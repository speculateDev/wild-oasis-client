import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function page({ searchParams }) {
  const token = searchParams.token;
  const cookieToken = cookies().get("thankyou")?.value;
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!token || cookieToken !== token) {
    redirect("/");
  }

  await fetch(`${baseUrl}/api/thankyou`);

  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <Link
        className="text-xl text-accent-500 inline-block underline underline-offset-4"
        href="/account/reservations"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}

export default page;
