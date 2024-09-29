"use client"

import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from "next-auth/react"
import "./globals.css"

const ProviderStack = [
  SessionProvider,
  JotaiProvider,
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const Providers = ProviderStack.reduce((AccProvider, CurrentProvider) => {
    const WrappedProviders = ({ children }: { children: React.ReactNode }) => (
      <AccProvider>
        <CurrentProvider>{children}</CurrentProvider>
      </AccProvider>
    )
    return WrappedProviders
  }, ({ children }: { children: React.ReactNode }) => <>{children}</>)

  return (
    <Providers>
      <html lang="en">
        <body>
          <main className="flex min-h-screen min-w-screen flex-col items-center justify-between">
            {children}
          </main>
        </body>
      </html>
    </Providers>
  )
}
