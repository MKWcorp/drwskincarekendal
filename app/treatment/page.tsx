'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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
  benefits: string;
  description: string;
}

interface TreatmentCategory {
  [key: string]: Treatment[];
}

const treatmentData: TreatmentCategory = {
  "Facial Basic": [
    { 
      "name": "Facial Basic / Pelajar", 
      "price": "Rp 50.000", 
      "benefits": "Membersihkan wajah dari kotoran dan minyak berlebih.",
      "description": "Perawatan dasar untuk pelajar dengan pembersihan kulit ringan agar wajah tetap segar dan sehat." 
    },
    { 
      "name": "Facial Whitening", 
      "price": "Rp 65.000", 
      "benefits": "Mencerahkan kulit kusam dan meratakan warna kulit.",
      "description": "Mengandung bahan pencerah untuk membuat wajah lebih glowing dan cerah alami." 
    },
    { 
      "name": "Facial Acne", 
      "price": "Rp 65.000", 
      "benefits": "Mengurangi jerawat aktif dan mengontrol minyak.",
      "description": "Facial khusus untuk kulit berjerawat dengan ekstraksi komedo dan soothing mask." 
    },
    { 
      "name": "Facial PDT (Omega Light)", 
      "price": "Rp 80.000", 
      "benefits": "Membantu regenerasi kulit dan mengurangi peradangan.",
      "description": "Menggunakan terapi cahaya LED untuk jerawat, kulit kusam, dan tanda penuaan." 
    },
    { 
      "name": "Masker Peel Off", 
      "price": "Rp 25.000", 
      "benefits": "Menyegarkan wajah, mengangkat sel kulit mati.",
      "description": "Masker praktis untuk mengencangkan kulit dan membersihkan pori-pori." 
    }
  ],
  "Facial Advance": [
    { 
      "name": "Facial Detox", 
      "price": "Rp 120.000", 
      "benefits": "Membersihkan toksin dan polusi dari kulit.",
      "description": "Cocok untuk kulit yang sering terpapar polusi, membuat wajah lebih segar." 
    },
    { 
      "name": "Facial Mikrodermabrasi", 
      "price": "Rp 130.000", 
      "benefits": "Menghaluskan kulit dan mengurangi noda hitam.",
      "description": "Teknik eksfoliasi dengan diamond tip untuk meratakan tekstur kulit." 
    },
    { 
      "name": "Facial RF", 
      "price": "Rp 130.000", 
      "benefits": "Mengencangkan kulit dan merangsang kolagen.",
      "description": "Menggunakan teknologi radio frekuensi untuk mengurangi tanda penuaan." 
    },
    { 
      "name": "Facial Chemical Peeling", 
      "price": "Rp 130.000", 
      "benefits": "Mengangkat sel kulit mati secara mendalam.",
      "description": "Menggunakan cairan peeling untuk mencerahkan kulit kusam dan mengurangi bekas jerawat." 
    },
    { 
      "name": "Facial HIV U Max", 
      "price": "Rp 150.000", 
      "benefits": "Menutrisi kulit dan meningkatkan elastisitas.",
      "description": "Perawatan advance dengan teknologi modern untuk kulit lebih sehat." 
    },
    { 
      "name": "Facial Hidrapeel", 
      "price": "Rp 150.000", 
      "benefits": "Menghidrasi kulit kering dan melembutkan wajah.",
      "description": "Teknologi hydra-dermabrasion untuk melembapkan kulit secara intensif." 
    },
    { 
      "name": "Facial Black Doll", 
      "price": "Rp 180.000", 
      "benefits": "Mengurangi pori besar dan mencerahkan kulit.",
      "description": "Menggunakan laser karbon aktif untuk membersihkan kulit secara mendalam." 
    },
    { 
      "name": "Facial Acne Serum", 
      "price": "Rp 140.000", 
      "benefits": "Mengatasi jerawat dengan serum khusus.",
      "description": "Perawatan jerawat dengan kombinasi facial dan aplikasi serum aktif." 
    },
    { 
      "name": "Facial DNA Salmon", 
      "price": "Rp 150.000", 
      "benefits": "Meremajakan kulit dan memperbaiki skin barrier.",
      "description": "Facial premium dengan kandungan DNA salmon untuk anti-aging dan glowing." 
    }
  ],
  "Special Treatments": [
    { 
      "name": "Counter / Buang Kutil", 
      "price": "Rp 110.000", 
      "benefits": "Menghilangkan kutil dengan aman.",
      "description": "Tindakan medis ringan untuk mengangkat kutil tanpa bekas berlebih." 
    },
    { 
      "name": "Dermapen", 
      "price": "Rp 150.000", 
      "benefits": "Mengurangi bekas jerawat dan merangsang kolagen.",
      "description": "Microneedling dengan dermapen untuk peremajaan kulit." 
    },
    { 
      "name": "BB Glow", 
      "price": "Rp 175.000", 
      "benefits": "Kulit tampak cerah seperti memakai BB cream.",
      "description": "Teknik semi-permanen untuk mencerahkan kulit secara natural." 
    },
    { 
      "name": "Tanam Benang Collagen", 
      "price": "Rp 150.000", 
      "benefits": "Mengencangkan kulit wajah.",
      "description": "Perawatan estetika dengan benang kolagen untuk lifting wajah." 
    },
    { 
      "name": "Magnetik Modmask", 
      "price": "Rp 120.000", 
      "benefits": "Membersihkan pori-pori dalam.",
      "description": "Masker unik dengan teknologi magnet untuk detox kulit." 
    },
    { 
      "name": "IPL Rejuve", 
      "price": "Rp 150.000", 
      "benefits": "Mengurangi pigmentasi dan membuat kulit lebih cerah.",
      "description": "Perawatan dengan cahaya intens untuk rejuvenasi kulit." 
    },
    { 
      "name": "Lash Lift", 
      "price": "Rp 75.000", 
      "benefits": "Membuat bulu mata lentik alami.",
      "description": "Perawatan bulu mata agar tampak lebih tebal dan lentik tanpa extension." 
    },
    { 
      "name": "Bekam Aesthetic + Acupuncture", 
      "price": "Rp 175.000", 
      "benefits": "Melancarkan peredaran darah dan relaksasi tubuh.",
      "description": "Kombinasi bekam modern dan akupuntur untuk kesehatan dan kecantikan." 
    },
    { 
      "name": "Facial + Bekam Aesthetic", 
      "price": "Rp 100.000", 
      "benefits": "Membersihkan wajah sekaligus melancarkan peredaran darah.",
      "description": "Perawatan unik yang menggabungkan facial dengan bekam modern." 
    },
    { 
      "name": "Facial Micro Detox", 
      "price": "Rp 170.000", 
      "benefits": "Detoksifikasi kulit mendalam.",
      "description": "Gabungan teknologi modern untuk mengeluarkan toksin dari kulit." 
    },
    { 
      "name": "Facial Micro/Detox RF", 
      "price": "Rp 200.000", 
      "benefits": "Mengencangkan kulit sekaligus detoks.",
      "description": "Kombinasi radio frekuensi dan detox facial untuk hasil maksimal." 
    },
    { 
      "name": "Laser Ketiak", 
      "price": "Rp 150.000", 
      "benefits": "Mengurangi bulu ketiak secara permanen.",
      "description": "Perawatan laser khusus area ketiak untuk kulit lebih bersih." 
    },
    { 
      "name": "Paket Laser + IPL Ketiak", 
      "price": "Rp 250.000", 
      "benefits": "Maksimal hasil bebas bulu ketiak.",
      "description": "Kombinasi laser dan IPL untuk perawatan ketiak." 
    }
  ],
  "Body Slimming": [
    { 
      "name": "Body Slimming Lengan", 
      "price": "Rp 150.000", 
      "benefits": "Mengencangkan dan mengecilkan lengan.",
      "description": "Perawatan body contouring khusus area lengan." 
    },
    { 
      "name": "Body Slimming Perut", 
      "price": "Rp 200.000", 
      "benefits": "Mengurangi lemak perut.",
      "description": "Treatment pembakaran lemak untuk perut lebih rata." 
    },
    { 
      "name": "Body Slimming Paha", 
      "price": "Rp 200.000", 
      "benefits": "Mengecilkan lingkar paha.",
      "description": "Perawatan body slimming untuk paha lebih ramping." 
    }
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
      <Header />

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
                        {/* Treatment Name & Category */}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300 flex-1 pr-2">
                            {treatment.name}
                          </h3>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)} shrink-0`}>
                            {category}
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="text-2xl font-bold text-primary mb-3">
                          {treatment.price}
                        </div>
                        
                        {/* Benefits */}
                        <div className="mb-3">
                          <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2 text-sm" />
                            <span className="text-sm font-semibold text-gray-700">Manfaat:</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {treatment.benefits}
                          </p>
                        </div>
                        
                        {/* Description */}
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <FontAwesomeIcon icon={faGem} className="text-primary mr-2 text-sm" />
                            <span className="text-sm font-semibold text-gray-700">Deskripsi:</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {treatment.description}
                          </p>
                        </div>
                        
                        {/* Booking Button */}
                        <button
                          onClick={() => handleWhatsAppBooking(treatment.name, treatment.price)}
                          className="w-full bg-gradient-to-r from-primary to-pink-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                        >
                          Booking Perawatan
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
      <Footer />
    </div>
  );
};

export default TreatmentPage;