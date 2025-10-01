import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
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