'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  namaProduk: string;
  deskripsi: string | null;
  hargaUmum: number | null;
  gambar: string | null;
  fotoProduk: string | null;
  slug: string;
  categories?: {
    name: string;
  } | null;
}

interface StaticProduct {
  id: string;
  namaProduk: string;
  category: string;
  hargaUmum: number;
  gambar: string | null;
  bgColor?: string;
}

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products/featured');
      const result = await response.json();
      
      if (result.success) {
        setFeaturedProducts(result.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Hubungi Kami';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  // Static products to fill remaining slots (melanjutkan dari produk API)
  const staticProducts: StaticProduct[] = [
    { id: 'static-1', namaProduk: 'DNA Salmon Serum', category: 'Anti Aging', hargaUmum: 450000, gambar: '/images/produk1.svg' },
    { id: 'static-2', namaProduk: 'Vitamin C Brightening Serum', category: 'Brightening', hargaUmum: 320000, gambar: '/images/produk2.svg' },
    { id: 'static-3', namaProduk: 'Acne Treatment Serum', category: 'Acne Care', hargaUmum: 280000, gambar: '/images/produk3.svg' },
    { id: 'static-4', namaProduk: 'Hyaluronic Acid Moisturizer', category: 'Moisturizer', hargaUmum: 250000, gambar: null, bgColor: 'from-pink-100 to-pink-200' },
    { id: 'static-5', namaProduk: 'SPF 50+ Sunscreen', category: 'Sunscreen', hargaUmum: 180000, gambar: null, bgColor: 'from-blue-100 to-blue-200' },
    { id: 'static-6', namaProduk: 'Gentle Foam Cleanser', category: 'Cleanser', hargaUmum: 150000, gambar: null, bgColor: 'from-green-100 to-green-200' },
    { id: 'static-7', namaProduk: 'Hydrating Toner', category: 'Toner', hargaUmum: 120000, gambar: null, bgColor: 'from-purple-100 to-purple-200' },
    { id: 'static-8', namaProduk: 'Eye Cream Anti Aging', category: 'Eye Care', hargaUmum: 380000, gambar: null, bgColor: 'from-yellow-100 to-yellow-200' }
  ];

  // Menampilkan 8 produk total: Prioritas produk dengan foto dan bisa diklik
  const getDisplayProducts = (): (Product | StaticProduct)[] => {
    // Filter produk API yang ada fotonya
    const productsWithImages = featuredProducts.filter(product => product.gambar || product.fotoProduk);
    
    // Tambahkan static products yang ada gambar
    const staticWithImages = staticProducts.filter(product => product.gambar);
    
    // Gabungkan semua produk (dengan foto dan tanpa foto)
    const allProducts: (Product | StaticProduct)[] = [
      ...productsWithImages, 
      ...staticWithImages, 
      ...featuredProducts.filter(product => !(product.gambar || product.fotoProduk)),
      ...staticProducts.filter(product => !product.gambar)
    ];
    
    return allProducts.slice(0, 8);
  };

  const renderProduct = (product: Product | StaticProduct, index: number) => {
    const isStatic = !('deskripsi' in product);
    const staticProduct = product as StaticProduct;
    const realProduct = product as Product;
    
    // Jika produk real dan punya foto, buat clickable link ke detail
    if (!isStatic && (realProduct.gambar || realProduct.fotoProduk) && realProduct.slug) {
      return (
        <Link key={product.id} href={`/product/${realProduct.slug}`} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer">
          <div className="relative w-full h-32 md:h-48 mb-3 md:mb-4">
            <Image 
              src={realProduct.gambar || realProduct.fotoProduk || ''} 
              alt={realProduct.namaProduk} 
              fill
              className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* Category */}
          <div className="inline-block bg-primary/10 group-hover:bg-primary/20 text-primary text-xs px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 transition-colors">
            {realProduct.categories?.name || 'Skincare'}
          </div>
          
          <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-primary mb-2 md:mb-3 line-clamp-2 transition-colors">
            {realProduct.namaProduk}
          </h3>
          
          {/* Price */}
          <div className="text-sm md:text-lg font-bold text-primary group-hover:scale-105 mb-3 md:mb-4 transition-transform">
            {formatPrice(realProduct.hargaUmum)}
          </div>
          
          <div className="text-xs text-gray-500">Klik untuk detail & beli</div>
        </Link>
      );
    }
    
    // Untuk static products atau products tanpa foto
    return (
      <div key={product.id} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer" onClick={() => window.open(`https://wa.me/6285852555571?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${product.namaProduk}`)}`)}>
        <div className="relative w-full h-32 md:h-48 mb-3 md:mb-4">
          {product.gambar ? (
            <Image 
              src={product.gambar} 
              alt={product.namaProduk} 
              fill
              className="object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className={`flex items-center justify-center h-full rounded-xl ${
              isStatic && staticProduct.bgColor 
                ? `bg-gradient-to-br ${staticProduct.bgColor}` 
                : 'bg-gray-100'
            }`}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-4xl text-primary" />
            </div>
          )}
        </div>
        
        {/* Category */}
        <div className="inline-block bg-primary/10 group-hover:bg-primary/20 text-primary text-xs px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 transition-colors">
          {isStatic ? staticProduct.category : (product as Product).categories?.name || 'Skincare'}
        </div>
        
        <h3 className="text-sm md:text-lg font-semibold text-gray-800 group-hover:text-primary mb-2 md:mb-3 line-clamp-2 transition-colors">
          {product.namaProduk}
        </h3>
        
        {/* Price */}
        <div className="text-sm md:text-lg font-bold text-primary group-hover:scale-105 mb-3 md:mb-4 transition-transform">
          {formatPrice(product.hargaUmum)}
        </div>
        
        <div className="text-xs text-gray-500">Klik untuk beli via WhatsApp</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="hero bg-gradient-to-r from-pink-50 to-white py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
              DRW Skincare - Kulit Sehat dan Cantik Dimulai dari Sini!
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8">
              Solusi perawatan kulit terbaik dengan produk skincare berkualitas dan konsultasi profesional langsung dari dr. Wahyu Triasmara.
            </p>
            <a 
              href="https://wa.me/6285852555571" 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Konsultasi Sekarang
            </a>
          </div>
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative">
              {/* Doctor Photo - PNG transparent, no crop, no frame */}
              <Image 
                src="/drwahyu.png" 
                alt="Dr. Wahyu Triasmara" 
                width={400}
                height={500}
                className="w-64 h-auto md:w-80 lg:w-96"
                priority
                quality={100}
                unoptimized
              />
              
              {/* Floating Label */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl px-4 py-3 border border-pink-100 text-center whitespace-nowrap">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-gray-800 text-xs leading-tight">
                    dr. Wahyu Triasmara, M.Kes AAAM, AIFO-K
                  </h3>
                  <p className="text-gray-600 text-xs">
                    Dokter & Founder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Section - Sekarang menampilkan 8 produk */}
      <section id="produk" className="py-12 md:py-20 px-4 md:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-16">
            Produk DRW Skincare
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {loading ? (
              // Loading skeleton - 8 produk
              [...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg md:rounded-2xl shadow-lg p-3 md:p-6 text-center animate-pulse">
                  <div className="w-full h-32 md:h-48 mb-3 md:mb-4 bg-gray-300 rounded-xl"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-2/3 mx-auto"></div>
                  <div className="h-8 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : (
              // Menampilkan 8 produk: API + static sebagai fallback
              getDisplayProducts().map((product, index) => renderProduct(product, index))
            )}
          </div>
          
          {/* View All Products Button */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/product" 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Treatment Section */}
      <section id="treatment" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Perawatan Unggulan
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-16 text-base md:text-xl">
            Treatment profesional untuk kulit sehat dan cantik
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Facial Basic */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Facial Basic</h3>
                <p className="text-gray-600 text-sm mb-4">Perawatan dasar untuk kulit sehat</p>
                <div className="text-2xl font-bold text-primary mb-4">Mulai Rp 50.000</div>
              </div>
              <Link href="/treatment" className="block w-full bg-primary text-white py-3 rounded-lg text-center hover:bg-pink-600 transition-colors">
                Lihat Detail
              </Link>
            </div>
            
            {/* Facial Advance */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Facial Advance</h3>
                <p className="text-gray-600 text-sm mb-4">Perawatan premium dengan teknologi modern</p>
                <div className="text-2xl font-bold text-primary mb-4">Mulai Rp 120.000</div>
              </div>
              <Link href="/treatment" className="block w-full bg-primary text-white py-3 rounded-lg text-center hover:bg-pink-600 transition-colors">
                Lihat Detail
              </Link>
            </div>
            
            {/* Special Treatments */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Special Treatment</h3>
                <p className="text-gray-600 text-sm mb-4">Perawatan khusus untuk hasil maksimal</p>
                <div className="text-2xl font-bold text-primary mb-4">Mulai Rp 75.000</div>
              </div>
              <Link href="/treatment" className="block w-full bg-primary text-white py-3 rounded-lg text-center hover:bg-pink-600 transition-colors">
                Lihat Detail
              </Link>
            </div>
          </div>
          
          {/* View All Treatments Button */}
          <div className="text-center mt-8 md:mt-12">
            <Link 
              href="/treatment" 
              className="bg-primary text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg hover:bg-pink-600 transition-colors inline-block"
            >
              Lihat Semua Perawatan
            </Link>
          </div>
        </div>
      </section>

      {/* Konsultasi Section */}
      <section id="konsultasi" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Konsultasi Gratis dengan Ahli Kulit
          </h2>
          <p className="text-base md:text-xl mb-6 md:mb-8">
            Tanya ahli kami seputar perawatan kulit yang tepat untukmu!
          </p>
          <a 
            href="https://wa.me/6285852555571" 
            className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </section>

      {/* Testimoni Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-8 md:mb-16">
            Apa Kata Mereka?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;Produk DRW Skincare membuat kulit saya lebih cerah dan sehat! Pelayanannya sangat memuaskan.&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Sarah M.</p>
            </div>
            
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;Konsultasi gratis yang sangat membantu. Sekarang kulit wajah saya bebas jerawat!&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Rina K.</p>
            </div>
            
            <div className="bg-white rounded-lg md:rounded-2xl shadow-lg p-4 md:p-8">
              <p className="text-gray-600 mb-3 md:mb-4 italic text-sm md:text-base">
                &ldquo;DNA Salmon Serum benar-benar ampuh untuk anti aging. Highly recommended!&rdquo;
              </p>
              <p className="font-semibold text-primary text-sm md:text-base">- Maya L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;