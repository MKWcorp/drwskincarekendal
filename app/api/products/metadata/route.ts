import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ 
        success: false, 
        error: 'Slug is required' 
      }, { status: 400 });
    }

    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
        isVisible: true
      },
      include: {
        categories: true
      }
    });

    if (!product) {
      return NextResponse.json({ 
        success: false, 
        error: 'Product not found' 
      }, { status: 404 });
    }

    // Generate metadata for the product
    const productImage = product.gambar || product.fotoProduk || '/logo_drwskincare.png';
    const productPrice = product.hargaUmum 
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(Number(product.hargaUmum))
      : 'Hubungi Kami';

    const title = `${product.namaProduk} - ${productPrice} | DRW Skincare`;
    const description = product.deskripsi 
      ? `${product.deskripsi} - Produk skincare berkualitas dari DRW Skincare dengan harga ${productPrice}. ${product.bpom ? `BPOM: ${product.bpom}` : ''}`
      : `${product.namaProduk} - Produk skincare berkualitas dari DRW Skincare dengan harga ${productPrice}. Konsultasi gratis dengan dokter berpengalaman.`;

    const metadata = {
      title,
      description,
      image: productImage,
      url: `https://drwskincarebanyuwangi.com/product/${slug}`,
      keywords: `${product.namaProduk}, skincare, DRW Skincare, produk kecantikan, perawatan kulit, ${product.bpom ? `BPOM ${product.bpom}` : ''}`,
      price: productPrice,
      bpom: product.bpom,
      category: product.categories?.name || 'Skincare'
    };

    return NextResponse.json({
      success: true,
      data: {
        product,
        metadata
      }
    });

  } catch (error) {
    console.error('Error fetching product metadata:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export const dynamic = 'force-dynamic';