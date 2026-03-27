import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "STRATA HYDRATION | Electrolyte Drink Mix",
  description: "Electrolyte powered hydration designed for daily performance. 0g Sugar, 3x Hydration, Low Calories. Fuel your day with STRATA Hydration.",
  keywords: ["hydration", "electrolyte", "drink mix", "citrus lime", "sugar free", "vegan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
