import { getCountries } from "@/app/_lib/data-service";

export async function GET() {
  try {
    const countries = await getCountries();
    return Response.json({ countries }, { status: 200 });
  } catch {
    console.log("Error in GETcountries endpoint: ", error);
    return Response.json(
      { message: "Failed fetching countries" },
      { status: 500 }
    );
  }
}
