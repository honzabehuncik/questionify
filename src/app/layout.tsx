import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Questionify",
  description: "An interactive app that takes your events to the next level.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-montserrat"
      >
        {children}
      </body>
    </html>
  );
}
