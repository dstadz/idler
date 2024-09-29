import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()

declare module 'next-auth' {
  interface Session {
    id: string
  }
}

const authOptions: NextAuthOptions = {
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
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async session(
      { session, token }: { session: Session; token: JWT }
    ) {
      if (token) {
        session.id = token.id as string
      }
      return session
    },
  },
}

const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST }
