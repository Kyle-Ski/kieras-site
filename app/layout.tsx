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

// 1) Add the extended SEO metadata here
export const metadata: Metadata = {
  title: "Kiera Stewart",
  description: "Official website of Kiera Stewart",

  // Good to add site-specific keywords for SEO
  keywords: ["Kiera Stewart", "Author", "Portfolio", "Blog", "Writer"],

  // Let’s say Kiera is the only author
  authors: [{ name: "Kiera Stewart" }],

  // Open Graph metadata for social sharing
  openGraph: {
    title: "Kiera Stewart | Official Website",
    description:
      "Welcome to the official website of Kiera Stewart. Discover her latest writings, blog posts, and more.",
    url: "https://www.kierastewart.com", 
    siteName: "Kiera Stewart",
    images: [
      {
        url: "https://www.kierastewart.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kiera Stewart website banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata for better Twitter card handling
  twitter: {
    card: "summary_large_image",
    site: "@kiera_stewart", // If Kiera has a Twitter handle
    title: "Kiera Stewart | Official Website",
    description:
      "Welcome to the official website of Kiera Stewart. Discover her latest writings, blog posts, and more.",
    images: ["https://www.kierastewart.com/og-image.jpg"],
  },
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
        style={{ paddingTop: "4rem" }} // Adjust this to match navbar height
      >
        <NavBar />
        <main className="container mx-auto sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
