import './globals.css'
import '../lib/fontawesome'
import { Inter } from 'next/font/google'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DRW Skincare - Produk Kecantikan Skincare & Perawatan Kulit Terbaik',
  description: 'DRW Skincare menyediakan produk kecantikan skincare dan perawatan kulit profesional, facial, treatment anti aging, dan produk skincare berkualitas. Konsultasi gratis dengan dokter berpengalaman.',
  keywords: 'DRW Skincare, produk kecantikan skincare, perawatan kulit, facial, skincare, treatment wajah, anti aging, jerawat, whitening, dokter kulit, kosmetik, kecantikan, perawatan wajah',
  authors: [{ name: 'DRW Skincare' }],
  creator: 'DRW Skincare',
  publisher: 'DRW Skincare',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo_drwskincare_square.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://drwskincarebanyuwangi.com',
    siteName: 'DRW Skincare',
    title: 'DRW Skincare - Produk Kecantikan Skincare & Perawatan Kulit Terbaik',
    description: 'DRW Skincare menyediakan produk kecantikan skincare dan perawatan kulit profesional, facial, treatment anti aging, dan produk skincare berkualitas.',
    images: [
      {
        url: '/logo_drwskincare.png',
        width: 1200,
        height: 630,
        alt: 'DRW Skincare Banyuwangi - Klinik Kecantikan Terbaik',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRW Skincare - Produk Kecantikan Skincare Terbaik',
    description: 'Produk kecantikan skincare dan perawatan kulit profesional dengan dokter berpengalaman dan produk berkualitas.',
    images: ['/logo_drwskincare.png'],
  },
  alternates: {
    canonical: 'https://drwskincarebanyuwangi.com',
  },
  other: {
    'geo.region': 'ID-JI',
    'geo.placename': 'Banyuwangi',
    'geo.position': '-8.2325;114.3675',
    'ICBM': '-8.2325, 114.3675',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "DRW Skincare",
    "description": "Produk kecantikan skincare dan perawatan kulit profesional dengan dokter berpengalaman",
    "url": "https://drwskincarebanyuwangi.com",
    "logo": "https://drwskincarebanyuwangi.com/logo_drwskincare.png",
    "image": "https://drwskincarebanyuwangi.com/logo_drwskincare.png",
    "telephone": "+62-858-5255-5571",
    "email": "info@drwskincare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "DRW Skincare Pusat",
      "addressLocality": "Banyuwangi",
      "addressRegion": "Jawa Timur",
      "postalCode": "68400",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -8.2325,
      "longitude": 114.3675
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Banyuwangi"
      },
      {
        "@type": "City", 
        "name": "Jember"
      },
      {
        "@type": "City",
        "name": "Situbondo"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K",
      "jobTitle": "Dokter & Founder"
    },
    "medicalSpecialty": [
      "Dermatology",
      "Cosmetic Medicine",
      "Anti-Aging Treatment"
    ],
    "serviceType": [
      "Facial Treatment",
      "Anti Aging Treatment",
      "Acne Treatment", 
      "Skin Whitening",
      "Skincare Products",
      "Beauty Consultation"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Su 09:00-21:00",
    "sameAs": [
      "https://wa.me/6285852555571"
    ]
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <meta name="google-site-verification" content="GOOGLE_VERIFICATION_CODE" />
      </head>
      <body className={inter.className}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}