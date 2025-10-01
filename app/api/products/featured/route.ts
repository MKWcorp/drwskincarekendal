import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isVisible: true
      },
      include: {
        categories: true
      },      orderBy: {
        namaProduk: 'asc'
      },
      take: 8
    })
    
    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured products' 
      },
      { status: 500 }
    )
  }
}