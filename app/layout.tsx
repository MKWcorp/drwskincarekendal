import './globals.css'
import '../lib/fontawesome'
import { Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta'
})
const dmSerif = DM_Serif_Display({ 
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif'
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://drwskincarekendal.com'),
  title: 'DRW Skincare - Produk Kecantikan Skincare & Perawatan Kulit Terbaik',
  description: 'DRW Skincare - Pusat kecantikan dan perawatan kulit terpercaya di Kendal. Menyediakan produk skincare berkualitas, treatment profesional, dan konsultasi dengan dokter berpengalaman. Lokasi strategis dan pelayanan terbaik.',
  keywords: 'DRW Skincare, klinik kecantikan kendal, produk skincare kendal, perawatan kulit kendal, dokter kulit kendal, facial kendal, treatment anti aging kendal, skincare profesional kendal, lokasi DRW skincare, alamat klinik kecantikan kendal',
  authors: [{ name: 'DRW Skincare' }],
  creator: 'DRW Skincare',
  publisher: 'DRW Skincare',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo_drwskincare_square.png',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://drwskincarekendal.com',
    siteName: 'DRW Skincare',
    title: 'DRW Skincare - Pusat Kecantikan & Perawatan Kulit Terpercaya',
    description: 'DRW Skincare - Pusat kecantikan dan perawatan kulit terpercaya di Kendal. Lokasi strategis dengan produk skincare berkualitas dan treatment profesional oleh dokter berpengalaman.',
    images: [
      {
        url: '/logo_drwskincare_square.png',
        width: 1200,
        height: 1200,
        alt: 'DRW Skincare - Pusat Kecantikan & Perawatan Kulit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DRW Skincare - Pusat Kecantikan Terpercaya',
    description: 'Pusat kecantikan dan perawatan kulit terpercaya di Kendal dengan produk skincare berkualitas dan dokter berpengalaman.',
    images: ['/logo_drwskincare_square.png'],
  },
  alternates: {
    canonical: 'https://drwskincarekendal.com',
  },
  other: {
    'geo.region': 'ID-JI',
    'geo.placename': 'Kendal',
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
    "url": "https://drwskincarekendal.com",
    "logo": "https://drwskincarekendal.com/logo_drwskincare_square.png",
    "image": "https://drwskincarekendal.com/logo_drwskincare_square.png",
    "telephone": "+62-858-5255-5571",
    "email": "info@drwskincare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "DRW Skincare Pusat",
      "addressLocality": "Kendal",
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
        "name": "Kendal"
      },
      {
        "@type": "City", 
        "name": "Semarang"
      },
      {
        "@type": "City",
        "name": "Pekalongan"
      },
      {
        "@type": "City",
        "name": "Batang"
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
      "https://wa.me/6289653602188"
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
      <body className={`${plusJakarta.className} ${dmSerif.variable} ${plusJakarta.variable}`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}