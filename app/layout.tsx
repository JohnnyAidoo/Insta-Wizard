import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Insta Wizard",
  description:
    "Insta Wizard - Automate Instagram posts effortlessly! Schedule, manage, and analyze your Instagram content with our powerful, user-friendly tool. Maximize engagement, save time, and grow your audience with advanced automation features.",
  icons: {
    icon: "/assets/images/logo.svg",
  },
  openGraph: {
    title: "Insta Wizard",
    description:
      "Insta Wizard - Automate Instagram posts effortlessly! Schedule, manage, and analyze your Instagram content with our powerful, user-friendly tool. Maximize engagement, save time, and grow your audience with advanced automation features.",
    images: [
      {
        url: "https://utfs.io/f/C19BB8h5djk8mZDR4CuH2QEyKuBGhjdeAUYgXS4L5FfvaIZp", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://utfs.io/f/C19BB8h5djk8mZDR4CuH2QEyKuBGhjdeAUYgXS4L5FfvaIZp", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "Insta Wizard Banner Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" className=" light bg-primary ">
          <body
            className={` bg-primary light `}
            style={{ overflowX: "hidden" }}
          >
            {children}
          </body>
        </html>
      </ClerkProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
