import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Perawatan Kulit & Kecantikan DRW Skincare - Treatment Profesional DRW Skincare',
  description: 'Pusat Perawatan Kulit & Kecantikan DRW Skincare. Treatment facial profesional, anti aging, whitening, jerawat, mikrodermabrasi, chemical peeling dengan dokter berpengalaman. Perawatan kulit terdepan dengan hasil optimal.',
  keywords: 'perawatan kulit, kecantikan DRW skincare, treatment facial, perawatan kulit profesional, klinik kecantikan, facial whitening, anti aging treatment, perawatan jerawat, mikrodermabrasi, chemical peeling, RF treatment, dokter kulit',
  metadataBase: new URL('https://drwskincarebanyuwangi.com'),
  openGraph: {
    title: 'Perawatan Kulit & Kecantikan DRW Skincare - Treatment Profesional',
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya. Treatment facial profesional dengan teknologi terdepan dan dokter berpengalaman untuk hasil kulit yang optimal.',
    images: [
      {
        url: '/og_treatment.png',
        width: 1200,
        height: 630,
        alt: 'DRW Skincare - Perawatan Kulit & Kecantikan Treatment Profesional',
      },
    ],
    type: 'website',
    siteName: 'DRW Skincare',
    url: 'https://drwskincarebanyuwangi.com/treatment',
    locale: 'id_ID',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perawatan Kulit & Kecantikan DRW Skincare',
    description: 'Pusat Perawatan Kulit & Kecantikan terpercaya dengan treatment profesional.',
    images: ['/logo_drwskincare_square.png'],
  },
  alternates: {
    canonical: 'https://drwskincarebanyuwangi.com/treatment',
  },
}

export default function TreatmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}