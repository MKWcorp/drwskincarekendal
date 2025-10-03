import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faInstagram, 
  faTiktok,
  faWhatsapp
} from '@fortawesome/free-brands-svg-icons';
import { 
  faPhone
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer id="kontak" className="bg-gray-800 text-white py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Kontak</h4>
            <div className="space-y-3">
              {/* WhatsApp Numbers */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faWhatsapp} className="text-green-400 w-5 h-5" />
                <div>
                  <a href="https://wa.me/6289653602188" className="text-gray-300 hover:text-white transition-colors">
                    0896-5360-2188
                  </a>
                  <span className="text-gray-400"> / </span>
                  <a href="https://wa.me/6285141223481" className="text-gray-300 hover:text-white transition-colors">
                    0851-4122-3481
                  </a>
                </div>
              </div>

              {/* Facebook Fan Page */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-400 w-5 h-5" />
                <a href="https://facebook.com/drwskincarestorekendal888" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Drw Skincare Store Kendal
                </a>
              </div>

              {/* Facebook Personal */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-400 w-5 h-5" />
                <a href="https://www.facebook.com/share/1KF2Rg9JSY/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  Nurya Drw Skincare
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faInstagram} className="text-pink-400 w-5 h-5" />
                <a href="https://instagram.com/drwstorekendal" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  @drwstorekendal
                </a>
              </div>

              {/* TikTok */}
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faTiktok} className="text-white w-5 h-5" />
                <a href="https://tiktok.com/@drwskincarenurya" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  @drwskincarenurya
                </a>
              </div>

              {/* Shopee */}
              <div className="flex items-center space-x-3">
                <Image 
                  src="/shopee.ico" 
                  alt="Shopee" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5"
                />
                <a href="https://shopee.co.id/drwskincarenurya" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  drwskincarenurya
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-4">Lokasi Kami</h4>
            <div className="rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6240094289046!2d110.2030363!3d-6.935461399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705d130f538805%3A0xd1088535041b3b57!2sDRW%20SKINCARE%20STORE%20KENDAL!5e0!3m2!1sid!2sid!4v1759335716146!5m2!1sid!2sid" 
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