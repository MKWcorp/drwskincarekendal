import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const slug = searchParams.get('slug')
    
    const whereCondition: any = {
      isVisible: true
    }
    
    if (slug) {
      whereCondition.slug = slug
    }
    
    const products = await prisma.product.findMany({
      where: whereCondition,
      include: {
        categories: true
      },
      orderBy: {
        namaProduk: 'asc'
      }
    })
    
    return NextResponse.json({
      success: true,
      data: products
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch products' 
      },
      { status: 500 }
    )
  }
}