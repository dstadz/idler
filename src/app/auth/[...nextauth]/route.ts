import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return user
        }

        throw new Error('Invalid email or password')
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
}

export async function GET(request: Request) {
  return NextAuth(request, authOptions)
}

export async function POST(request: Request) {
  return NextAuth(request, authOptions)
}
