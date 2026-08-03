import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://connectkes.com"),

  title: {
     default: "Connect KES | Engineering Consultancy in Nepal",
  template: `%s | Connect KES`,
  },
  description: siteConfig.description,

  alternates:{
    canonical: "/",
  },
  openGraph: {
  type: "website",
  url: "/",
  siteName: "Connect KES",
  title: "Connect KES | Engineering Consultancy in Nepal",
  description: siteConfig.description,
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Connect KES engineering consultancy in Nepal",
    },
  ],
},
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}