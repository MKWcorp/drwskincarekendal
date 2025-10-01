'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faSpa,
  faSearch,
  faFilter,
  faStar,
  faGem,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

interface Treatment {
  name: string;
  price: string;
}

interface TreatmentCategory {
  [key: string]: Treatment[];
}

const treatmentData: TreatmentCategory = {
  "Facial Basic": [
    { "name": "Facial Basic / Pelajar", "price": "50k" },
    { "name": "Facial Whitening", "price": "65k" },
    { "name": "Facial Acne", "price": "65k" },
    { "name": "Facial PDT (Omega Light)", "price": "80k" },
    { "name": "Masker Peel Off", "price": "25k" }
  ],
  "Facial Advance": [
    { "name": "Facial Detox", "price": "120k" },
    { "name": "Facial Mikrodermabrasi", "price": "130k" },
    { "name": "Facial RF", "price": "130k" },
    { "name": "Facial Chemical Peeling", "price": "130k" },
    { "name": "Facial HIV U Max", "price": "150k" },
    { "name": "Facial Hidrapeel", "price": "150k" },
    { "name": "Facial Black Doll", "price": "180k" },
    { "name": "Facial Acne Serum", "price": "140k" },
    { "name": "Facial DNA Salmon", "price": "150k" }
  ],
  "Special Treatments": [
    { "name": "Counter / Buang Kutil", "price": "Mulai 110k" },
    { "name": "Dermapen", "price": "150k" },
    { "name": "BB Glow", "price": "175k" },
    { "name": "Tanam Benang Collagen", "price": "150k" },
    { "name": "Magnetik Modmask", "price": "120k" },
    { "name": "IPL Rejuve", "price": "150k" },
    { "name": "Lash Lift", "price": "75k" },
    { "name": "Bekam Aesthetic + Acupuncture", "price": "175k" },
    { "name": "Facial + Bekam Aesthetic", "price": "100k" },
    { "name": "Facial Micro Detox", "price": "170k" },
    { "name": "Facial Micro/Detox RF", "price": "200k" },
    { "name": "Laser Ketiak", "price": "150k" },
    { "name": "Paket Laser + IPL Ketiak", "price": "250k" }
  ],
  "Body Slimming": [
    { "name": "Body Slimming Lengan", "price": "150k" },
    { "name": "Body Slimming Perut", "price": "200k" },
    { "name": "Body Slimming Paha", "price": "200k" }
  ]
};

const TreatmentPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleWhatsAppBooking = (treatmentName: string, price: string) => {
    const message = `Halo! Saya tertarik untuk booking treatment "${treatmentName}" dengan harga ${price}. Bisa tolong berikan informasi jadwal dan prosedurnya?`;
    const whatsappUrl = `https://wa.me/6285852555571?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Facial Basic':
        return faSpa;
      case 'Facial Advance':
        return faGem;
      case 'Special Treatments':
        return faStar;
      case 'Body Slimming':
        return faUsers;
      default:
        return faSpa;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Facial Basic':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Facial Advance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Special Treatments':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Body Slimming':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTreatments = () => {
    let filtered: { category: string; treatments: Treatment[] }[] = [];
    
    Object.entries(treatmentData).forEach(([category, treatments]) => {
      if (selectedCategory === 'all' || selectedCategory === category) {
        const filteredTreatmentsList = treatments.filter(treatment =>
          treatment.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredTreatmentsList.length > 0) {
          filtered.push({ category, treatments: filteredTreatmentsList });
        }
      }
    });
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo_drwskincare.png" 
              alt="DRW Skincare Logo" 
              width={300}
              height={100}
              className="h-10 md:h-12 w-auto"
              priority
              quality={100}
              unoptimized
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Beranda
            </Link>
            <Link href="/product" className="text-gray-700 hover:text-primary transition-colors">
              Produk
            </Link>
            <Link href="/treatment" className="text-primary font-semibold">
              Perawatan
            </Link>
            <Link href="/#kontak" className="text-gray-700 hover:text-primary transition-colors">
              Kontak
            </Link>
          </nav>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary">
              ← Beranda
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <section className="bg-gradient-to-br from-primary to-pink-600 py-12 md:py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Treatment & Perawatan
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Pilihan perawatan terbaik untuk kecantikan dan kesehatan kulit Anda
          </p>
          <div className="flex items-center justify-center gap-4 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faSpa} />
              Profesional
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faGem} />
              Teknologi Modern
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} />
              Hasil Terjamin
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari treatment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <FontAwesomeIcon 
                icon={faFilter} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white min-w-[200px]"
              >
                <option value="all">Semua Kategori</option>
                {Object.keys(treatmentData).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="pb-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {filteredTreatments().length === 0 ? (
            <div className="text-center py-20">
              <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                Tidak ada treatment yang ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Coba ubah kata kunci pencarian atau pilih kategori yang berbeda
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            filteredTreatments().map(({ category, treatments }) => (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${getCategoryColor(category)}`}>
                    <FontAwesomeIcon icon={getCategoryIcon(category)} className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {category}
                    </h2>
                    <p className="text-gray-600">
                      {treatments.length} treatment tersedia
                    </p>
                  </div>
                </div>

                {/* Treatments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {treatments.map((treatment, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 group overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Treatment Name */}
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                          {treatment.name}
                        </h3>
                        
                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-2xl font-bold text-primary">
                            Rp {treatment.price}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)}`}>
                            {category}
                          </div>
                        </div>
                        
                        {/* Booking Button */}
                        <button
                          onClick={() => handleWhatsAppBooking(treatment.name, treatment.price)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                          <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                          Book via WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-pink-600 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Konsultasi Gratis Sebelum Treatment
          </h2>
          <p className="text-lg text-pink-100 mb-8">
            Tim dokter dan terapis berpengalaman siap memberikan konsultasi terbaik untuk kebutuhan perawatan Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/6285852555571" 
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
              Konsultasi Sekarang
            </a>
            <Link 
              href="/product" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faSpa} />
              Lihat Produk Perawatan
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4 flex justify-center">
            <Image 
              src="/logo_drwskincare.png" 
              alt="DRW Skincare Logo" 
              width={300}
              height={100}
              className="h-16 w-auto filter brightness-0 invert"
              quality={100}
              unoptimized
            />
          </div>
          <div className="space-y-2 text-gray-300 mb-8">
            <p><FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" /> DRW Skincare Pusat Banyuwangi</p>
            <p><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> info@drwskincare.com</p>
            <p><FontAwesomeIcon icon={faPhone} className="mr-2" /> 0858-5255-5571</p>
          </div>
          <div className="border-t border-gray-700 pt-8 text-gray-400 text-sm">
            <p>&copy; 2025 DRW Skincare Banyuwangi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TreatmentPage;