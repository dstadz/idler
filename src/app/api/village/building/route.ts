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
        resources: {
          ...(Object.fromEntries(
            Object.keys(RESOURCES).map(key => [key, 0])
          ) as ResourceRecord),
        },
      },
    })
    console.log(`🚀 ~ file: route.ts:38 ~ POST ~ resourceInventory:`, resourceInventory)

    const entity = await prisma.entities.create({
      data: {
        userId,
        resourceInventoryId: resourceInventory.id,
      },
    })
    console.log(`🚀 ~ file: route.ts:46 ~ POST ~ entity:`, entity)

    const homeNode = await prisma.building.create({
      data: {
        entityId: entity.id,
        resourceInventoryId: resourceInventory.id,
        type: 'HomeNode',
        xPos: Math.floor(Math.random() * 1000),
        yPos: Math.floor(Math.random() * 1000),
        // resources,
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
