import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Product {
  id: string;
  namaProduk: string;
  deskripsi: string | null;
  hargaUmum: number | null;
  gambar: string | null;
  fotoProduk: string | null;
  slug: string;
  bpom: string | null;
}

async function fetchProduct(slug: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/products?slug=${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    
    if (result.success && result.data.length > 0) {
      return result.data[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const product = await fetchProduct(params.slug);

  if (!product) {
    return {
      title: 'Produk Tidak Ditemukan - DRW Skincare',
      description: 'Produk yang Anda cari tidak ditemukan di DRW Skincare.',
    };
  }

  const productImage = product.gambar || product.fotoProduk || '/logo_drwskincare.png';
  const productPrice = product.hargaUmum 
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(product.hargaUmum)
    : 'Hubungi Kami';

  const title = `${product.namaProduk} - ${productPrice} | DRW Skincare`;
  const description = product.deskripsi 
    ? `${product.deskripsi} - Produk skincare berkualitas dari DRW Skincare dengan harga ${productPrice}. ${product.bpom ? `BPOM: ${product.bpom}` : ''}`
    : `${product.namaProduk} - Produk skincare berkualitas dari DRW Skincare dengan harga ${productPrice}. Konsultasi gratis dengan dokter berpengalaman.`;

  return {
    title,
    description,
    keywords: `${product.namaProduk}, skincare, DRW Skincare, produk kecantikan, perawatan kulit, ${product.bpom ? `BPOM ${product.bpom}` : ''}`,
    openGraph: {
      title,
      description,
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
          alt: `${product.namaProduk} - DRW Skincare`,
        },
      ],
      type: 'website',
      siteName: 'DRW Skincare',
      url: `https://drwskincarebanyuwangi.com/product/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [productImage],
    },
    alternates: {
      canonical: `https://drwskincarebanyuwangi.com/product/${params.slug}`,
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}