import type { Metadata } from "next";
import localFont from "next/font/local";
import { Irish_Grover, Alice } from 'next/font/google';
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Google Fonts
const irishGrover = Irish_Grover({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-irish-grover',
})

const alice = Alice({
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-alice',
})

// Local font for Cal Sans from public folder
const calSans = localFont({
  src: "./fonts/Cal_Sans,Fira_Sans/Cal_Sans/CalSans-Regular.ttf",
  variable: "--font-cal-sans",
  weight: "400",
});

// Keep existing fonts as fallbacks
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans", 
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
        className={`${irishGrover.variable} ${alice.variable} ${calSans.variable} ${geistSans.variable} antialiased bg-gray-50 text-gray-900`}
        style={{ paddingTop: "4rem" }}
      >
        <NavBar />
        <main className="container mx-auto sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}