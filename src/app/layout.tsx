'use client'
import React, { useEffect } from 'react'
import { Provider as JotaiProvider, useAtom } from 'jotai'
import './globals.css'
import { supabase } from '@/lib/supabase'
import { userIdAtom } from '@/atoms'
import { useParams } from 'next/navigation'

const ProviderStack = [
  JotaiProvider,
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [userId, setUserId] = useAtom(userIdAtom)
  const params = useParams<{ tag: string; item: string }>()
  // console.log(`🚀 ~ file: layout.tsx:15 ~ RootLayout ~ params:`, params)

//   if (!userId) {
//   // User is signed in, you can redirect them to the dashboard
//   window.location.href = '/signin'
// } else {
//   console.error('Error: Unknown error occurred')
// }

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
        <CurrentProvider>
          {providerChildren}
        </CurrentProvider>
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
