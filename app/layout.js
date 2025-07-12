import Header from "./_components/Header";
import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/_lib/auth";

const josephin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },

  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body
        className={`${josephin.className} bg-primary-950 text-primary-100 flex flex-col min-h-screen antialiased relative`}
      >
        <SessionProvider session={session}>
          <Header />
          <div className="flex-1 py-12 sm:px-8 px-4 grid">
            <main className="max-w-7xl mx-auto w-full">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
