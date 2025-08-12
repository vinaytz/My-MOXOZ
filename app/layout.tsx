import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOXOZ - Professional Productivity Platform",
  description: "The ultimate productivity platform with auto-completing task timers, advanced analytics, and seamless collaboration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
