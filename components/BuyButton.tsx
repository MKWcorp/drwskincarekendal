'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

interface BuyButtonProps {
  productName: string
  className?: string
}

export default function BuyButton({ productName, className = "" }: BuyButtonProps) {
  const whatsappNumber = '6285852555571' // Format: 62 + nomor tanpa 0 di depan  
  const message = `Halo! Saya tertarik untuk membeli produk "${productName}". Bisa tolong berikan informasi lebih lanjut?`
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`
        bg-green-500 hover:bg-green-600 
        text-white font-semibold py-3 px-6 rounded-lg
        flex items-center justify-center gap-2
        shadow-lg hover:shadow-xl 
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        ${className}
      `}
      aria-label={`Beli ${productName} via WhatsApp`}
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
      Beli via WhatsApp
    </button>
  )
}