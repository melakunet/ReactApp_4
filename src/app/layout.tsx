/**
 * layout.tsx
 * This is the root layout for the whole app.
 * It wraps every page and sets the browser tab title and fonts.
 * I kept this file clean — all the interactive parts live inside
 * the individual components so Next.js can still server-render this.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Page metadata shown in the browser tab */
export const metadata: Metadata = {
  title: "📚 Book Voting App",
  description: "Vote for your favourite programming books — Assignment 4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      {/* Zustand doesn't need a Provider so I can keep the layout simple */}
      <body>{children}</body>
    </html>
  );
}
