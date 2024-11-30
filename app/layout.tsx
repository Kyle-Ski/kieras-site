import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Kiera Stewart",
  description: "Official website of Kiera Stewart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="antialiased bg-gray-50 text-gray-900"
        style={{ paddingTop: "4rem" }} /* Adjust this to match navbar height */
      >
        <NavBar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

