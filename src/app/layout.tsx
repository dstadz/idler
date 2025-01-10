'use client'
import React from 'react'
import { Provider as JotaiProvider } from 'jotai'
import './globals.css'

const ProviderStack = [
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
      <html lang='en' suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true}>
          <main className='flex min-h-screen min-w-screen flex-col items-center justify-between'>
            {children}
          </main>
        </body>
      </html>
    </Providers>
  )
}
