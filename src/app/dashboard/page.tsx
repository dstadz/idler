
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const data = await supabase.from('users').select('*')
  console.log(`🚀 ~ file: page.tsx:10 ~ Page ~ data:`, data)

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  )
}
