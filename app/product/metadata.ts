import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produk Skincare Terbaik - DRW Skincare',
  description: 'Temukan koleksi lengkap produk skincare berkualitas dari DRW Skincare. Facial serum, moisturizer, cleanser, dan treatment khusus dengan formula dokter berpengalaman.',
  keywords: 'produk skincare, DRW Skincare, serum wajah, moisturizer, cleanser, facial serum, perawatan kulit, kosmetik BPOM, produk dokter',
  openGraph: {
    title: 'Produk Skincare Terbaik - DRW Skincare',
    description: 'Koleksi lengkap produk skincare berkualitas dengan formula dokter berpengalaman. Dapatkan kulit sehat dan glowing dengan produk terpercaya.',
    images: [
      {
        url: '/logo_drwskincare.png',
        width: 1200,
        height: 630,
        alt: 'DRW Skincare - Produk Skincare Terbaik',
      },
    ],
    type: 'website',
    siteName: 'DRW Skincare',
    url: 'https://drwskincarebanyuwangi.com/product',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produk Skincare Terbaik - DRW Skincare',
    description: 'Koleksi lengkap produk skincare berkualitas dengan formula dokter berpengalaman.',
    images: ['/logo_drwskincare.png'],
  },
  alternates: {
    canonical: 'https://drwskincarebanyuwangi.com/product',
  },
}