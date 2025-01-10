import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'

// Initialize Prisma
const prisma = new PrismaClient()

// Extend session object to include user ID
declare module 'next-auth' {
  interface Session {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (user && (await compare(credentials.password, user.password))) {
          return { id: user.id, name: user.name, email: user.email }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006') // Replace with your React Native app origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  // Handle NextAuth
  return await NextAuth(req, res, authOptions)
}
