import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { RESOURCES } from '@/utils/constants'
import { ResourceRecord } from '@/types/node'
import { getUserIdFromRequest } from '@/utils/helpers'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromRequest(request)

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

    return NextResponse.json({ homeNode }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating home node:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error('Unknown error:', error)
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 })
    }
  }
}

export async function GET(request: Request) {
  try {
    const userId = await getUserIdFromRequest(request)

    const homeNode = await prisma.building.findFirst({
      where: {
        entity: {
          userId,
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
    if (error instanceof Error) {
      console.error('Error fetching home node:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      console.error('Unknown error:', error)
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 })
    }
  }
}
