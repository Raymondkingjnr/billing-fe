import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "@/component/providers";

const getLato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "strip billing",
  description: "strip billing test api",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
      <Providers>
      <html lang="en">
      <body className={getLato.className}>{children}</body>
      </html>
      </Providers>
  );
}
