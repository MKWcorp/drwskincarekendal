import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer id="kontak" className="bg-gray-800 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <div className="mb-4">
              <Image 
                src="/logo_drwskincare.png" 
                alt="DRW Skincare - Produk Kecantikan Skincare & Perawatan Kulit Terbaik" 
                width={300}
                height={100}
                className="h-16 w-auto"
                quality={100}
                unoptimized
              />
            </div>
            <p className="text-gray-300 mb-4">
              Solusi perawatan kulit terbaik dengan produk berkualitas dan konsultasi profesional.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Lokasi Kami</h4>
            <div className="rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d246.68483422657434!2d114.27215168518775!3d-8.40585001876544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd3fd69d910bc81%3A0xdc7f68fe1babbfd6!2sRumah%20Cantik%20Drw%20Skincare%20YK%20Beautycare%20%26%20D'kriuk%20Fried%20Chicken!5e0!3m2!1sid!2sid!4v1759233026595!5m2!1sid!2sid" 
                width="100%" 
                height="200" 
                style={{border: 0}} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-48 md:h-56"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 DRW Skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;