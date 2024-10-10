'use client'
import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import { SessionProvider } from 'next-auth/react'
import './globals.css'

const ProviderStack = [
  SessionProvider,
  JotaiProvider,
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const Providers = ProviderStack.reduce((AccProvider, CurrentProvider) => {
    const WrappedProviders = ({ children: providerChildren }: { children: React.ReactNode }) => (
      <AccProvider>
        <CurrentProvider>{providerChildren}</CurrentProvider>
      </AccProvider>
    )
    return WrappedProviders
  }, ({ children: layoutChildren }: { children: React.ReactNode }) => <>{layoutChildren}</>)

  return (
    <Providers>
      <html lang='en'>
        <body>
          <main className='flex min-h-screen min-w-screen flex-col items-center justify-between'>
            {children}
          </main>
        </body>
      </html>
    </Providers>
  )
}
