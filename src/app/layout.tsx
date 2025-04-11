'use client'
import React, { useEffect } from 'react'
import { Provider as JotaiProvider, useSetAtom } from 'jotai'
import './globals.css'
import { supabase } from '@/lib/supabase'
import { userIdAtom } from '@/atoms'
import { GameStateProvider } from '@/contexts/GameStateContext'

const ProviderStack = [
  JotaiProvider,
  GameStateProvider,
]

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const setUserId = useSetAtom(userIdAtom)
  // console.log(`🚀 ~ file: layout.tsx:15 ~ RootLayout ~ params:`, params)

//   if (!userId) {
//   // User is signed in, you can redirect them to the dashboard
//   window.location.href = '/signin'
// } else {
//   console.error('Error: Unknown error occurred')
// }

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (session) {
        setUserId(session.user.id)
      }
    }
    checkSession()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id)
    })

    return () => {
      subscription?.unsubscribe()
    }
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
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
        <body suppressHydrationWarning={true}>
          <main className='flex min-h-screen min-w-screen flex-col items-center justify-between'>
            {children}
          </main>
        </body>
      </html>
    </Providers>
  )
}
