import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/Layout/NavBar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import NavSkeleton from "./components/skeleton/NavSkeleton";
import SideBarToggleContextProvider from "@/utilty/SideBarToggleContext";

const cairo = Cairo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cairo.className + " bg-black-300 text-white"}>
        <SessionProvider>
          <SideBarToggleContextProvider>
            <Suspense fallback={<NavSkeleton />}>
              <NavBar />
            </Suspense>
            {children}
          </SideBarToggleContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
