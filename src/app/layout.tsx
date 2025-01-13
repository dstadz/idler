'use client'
import React, { useEffect } from 'react'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import './globals.css'
import { supabase } from '@/lib/supabase'
import { userIdAtom } from '@/atoms'

const ProviderStack = [
  JotaiProvider,
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [_, setUserId] = useAtom(userIdAtom)

  useEffect(() => {
    const { data, error } = supabase
      .auth
      .onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })

    return () => { supabase.auth.onAuthStateChange(null) }
  }, [setUserId])

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
