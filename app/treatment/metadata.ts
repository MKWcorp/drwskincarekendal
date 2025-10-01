import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perawatan Kulit & Kecantikan DRW Skincare - Treatment Profesional Banyuwangi',
  description: 'Pusat Perawatan Kulit & Kecantikan DRW Skincare Banyuwangi. Treatment facial profesional, anti aging, whitening, jerawat, mikrodermabrasi, chemical peeling dengan dokter berpengalaman. Perawatan kulit terdepan dengan hasil optimal.',
  keywords: 'perawatan kulit banyuwangi, kecantikan DRW skincare, treatment facial banyuwangi, perawatan kulit profesional, klinik kecantikan banyuwangi, facial whitening, anti aging treatment, perawatan jerawat, mikrodermabrasi banyuwangi, chemical peeling, RF treatment, dokter kulit banyuwangi',
  openGraph: {
    title: 'Perawatan Kulit & Kecantikan DRW Skincare - Treatment Profesional Banyuwangi',
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya di Banyuwangi. Treatment facial profesional dengan teknologi terdepan dan dokter berpengalaman untuk hasil kulit yang optimal.',
    images: [
      {
        url: '/logo_drwskincare_square.png',
        width: 1200,
        height: 1200,
        alt: 'DRW Skincare - Perawatan Kulit & Kecantikan Profesional Banyuwangi',
      },
    ],
    type: 'website',
    siteName: 'DRW Skincare Banyuwangi',
    url: 'https://drwskincarebanyuwangi.com/treatment',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perawatan Kulit & Kecantikan DRW Skincare Banyuwangi',
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya di Banyuwangi dengan treatment profesional.',
    images: ['/logo_drwskincare_square.png'],
  },
  alternates: {
    canonical: 'https://drwskincarebanyuwangi.com/treatment',
  },
}