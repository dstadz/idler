"use client"
import type { Metadata } from "next"

import { SessionProvider } from "next-auth/react"
import "./globals.css"

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <main className="flex min-h-screen min-w-screen flex-col items-center justify-between">
            {children}
          </main>
        </body>
      </html>
    </SessionProvider>
  )
}
