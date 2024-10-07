import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import { RESOURCES } from '@/utils/constants' // Ensure this import is correct

const prisma = new PrismaClient()

export async function POST(request: Request) {
  const session = await getSession({ req: { headers: { cookie: request.headers.get('cookie') } } })

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userEmail = session.user.email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const userId = user.id

  try {
    const resourceInventory = await prisma.resourceInventory.create({
      data: {
        ...(Object.fromEntries(
        Object.keys(RESOURCES).map(key => [key.toLowerCase(), 10])
      ) as ResourceRecord),
    },
    })
    const entity = await prisma.entity.create({
      data: {
        resourceInventoryId: resourceInventory.id,
        userId,
      },
    })

    await prisma.resourceInventory.update({
      where: { id: resourceInventory.id },
      data: {
        entityId: entity.id,
      },
    })

    const homeNode = await prisma.building.create({
      data: {
        entityId: entity.id,
        type: 'HomeNode',
        xPos: Math.floor(Math.random() * 1000),
        yPos: Math.floor(Math.random() * 1000),
        level: 1,
        techUnlocked: false,
      },
    })
    console.log(`🚀 ~ file: route.ts:60 ~ POST ~ homeNode:`, homeNode)

    return NextResponse.json({ homeNode }, { status: 200 })
  } catch (error) {
    console.error('Error creating home node:', error)
    return NextResponse.json({ error: 'Failed to create home node' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const session = await getSession({ req: { headers: { cookie: request.headers.get('cookie') } } })

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userEmail = session.user.email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const userId = user.id

  try {
    // Find the home node for the current user
    const homeNode = await prisma.building.findFirst({
      where: {
        entity: {
          userId: userId,
        },
        type: 'HomeNode',
      },
      include: {
        entity: {
          include: {
            resourceInventory: true,
          },
        },
      },
    })

    if (!homeNode) {
      return NextResponse.json({ error: 'Home node not found' }, { status: 404 })
    }

    return NextResponse.json({ homeNode }, { status: 200 })
  } catch (error) {
    console.error('Error fetching home node:', error)
    return NextResponse.json({ error: 'Failed to fetch home node' }, { status: 500 })
  }
}
