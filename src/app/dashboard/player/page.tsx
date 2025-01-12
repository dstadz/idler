'use client'
import React, { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
const PlayerPage = () => {

    useEffect(() => {
      const fetchData = async () => {
       // First, get the current user from Supabase auth
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        console.log(`🚀 ~ file:~ fetchData ~ user:`, user)

        if (authError) {
          console.error("Authentication error:", authError)
        } else if (user) {
          console.log(`🚀 ~user:`, user.id)
          const { data: users, error: dbError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)

          if (dbError) {
            console.error("Database error:", dbError)
          } else {
            console.log("User's row:", users)
          }
        } else {
          console.error("No authenticated user found")
        }
      }
      fetchData()
    }, [userId, supabase]) // Add supabase to the dependency array

  return (
    <div>
      This is the Player Page Content
    </div>
  )
}

export default PlayerPage
