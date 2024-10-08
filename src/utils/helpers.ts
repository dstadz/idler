import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient()

export const getUserIdFromRequest = async (request: Request): Promise<string> => {
  const cookie = request.headers.get('cookie') ?? undefined
  const session = await getSession({ req: { headers: { cookie } } })

  if (!session) {
    throw new Error('Unauthorized')
  }

  const userEmail = session.user?.email
  if (!userEmail) {
    throw new Error('No email on record')
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user.id
}
