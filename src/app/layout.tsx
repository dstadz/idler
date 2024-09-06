import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Idle game ",
  description: "how to enjoy time that could  be better spent anywhere else",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-full justify-center bg-blue-100">
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
