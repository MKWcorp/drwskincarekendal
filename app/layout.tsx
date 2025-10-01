import './globals.css'
import '../lib/fontawesome'
import { Inter } from 'next/font/google'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DRW Skincare Banyuwangi - Perawatan Kulit Terbaik',
  description: 'Solusi perawatan kulit terbaik dengan produk berkualitas dan konsultasi profesional di Banyuwangi.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  )
}