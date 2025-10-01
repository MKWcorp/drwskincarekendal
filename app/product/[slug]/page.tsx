'use client';

import { notFound } from "next/navigation";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: string;
  namaProduk: string;
  deskripsi: string | null;
  hargaUmum: number | null;
  hargaConsultant: number | null;
  hargaDirector: number | null;
  hargaManager: number | null;
  hargaSupervisor: number | null;
  gambar: string | null;
  fotoProduk: string | null;
  categoryId: string | null;
  slug: string;
  bpom: string | null;
  isBundling: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        // Filter out current product and get 4 random products
        const filtered = result.data.filter((p: Product) => p.slug !== params.slug);
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        setRelatedProducts(shuffled.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching related products:', err);
    }
  };

  const handleShare = () => {
    if (navigator.share && product) {
      navigator.share({
        title: product.namaProduk,
        text: product.deskripsi || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link produk telah disalin ke clipboard!');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products?slug=${params.slug}`);
      const result = await response.json();
      
      if (result.success && result.data.length > 0) {
        setProduct(result.data[0]);
      } else {
        setError('Produk tidak ditemukan');
      }
    } catch (err) {
      setError('Error loading product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link 
          href="/product" 
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Kembali ke Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="flex justify-between items-center px-4 md:px-6 py-4 md:py-5 bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center">
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
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/product" className="text-gray-700 hover:text-primary transition-colors">Produk</Link>
          <Link href="/treatment" className="text-gray-700 hover:text-primary transition-colors">Treatment</Link>
          <a href="#kontak" className="text-gray-700 hover:text-primary transition-colors">Kontak</a>
        </nav>
        <a 
          href="https://wa.me/6285852555571" 
          className="bg-primary text-white px-3 md:px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors text-sm md:text-base"
        >
          <span className="hidden md:inline">Konsultasi Gratis</span>
          <span className="md:hidden">Konsultasi</span>
        </a>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link 
            href="/product" 
            className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Kembali ke Produk
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {(product.gambar || product.fotoProduk) && !imageError ? (
              <Image 
                src={product.gambar || product.fotoProduk || ''} 
                alt={product.namaProduk} 
                width={500} 
                height={500} 
                className="rounded-lg shadow-lg w-full object-cover" 
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="bg-gray-200 rounded-lg shadow-lg w-full h-[500px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-20 w-20 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg font-semibold">Foto Produk</p>
                  <p className="text-sm">Tidak tersedia</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.namaProduk}</h1>
            
            {product.deskripsi && (
              <p className="text-lg text-gray-700 leading-relaxed">{product.deskripsi}</p>
            )}
            
            {product.bpom && (
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">BPOM:</span> {product.bpom}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              {product.hargaUmum && (
                <p className="text-2xl font-bold text-green-600">
                  Rp {Number(product.hargaUmum).toLocaleString('id-ID')}
                </p>
              )}
              
              <div className="flex gap-3">
                <BuyButton 
                  productName={product.namaProduk} 
                  className="flex-1"
                />
                <button
                  onClick={handleShare}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
                  Bagikan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              4 Produk DRW Skincare Lainnya
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.slug}`}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="relative w-full h-32 md:h-40 mb-3">
                    {relatedProduct.gambar || relatedProduct.fotoProduk ? (
                      <Image 
                        src={relatedProduct.gambar || relatedProduct.fotoProduk || ''} 
                        alt={relatedProduct.namaProduk} 
                        fill
                        className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="bg-gray-200 rounded-t-lg w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 group-hover:text-primary mb-2 line-clamp-2 transition-colors">
                      {relatedProduct.namaProduk}
                    </h3>
                    {relatedProduct.hargaUmum && (
                      <p className="text-primary font-bold text-sm md:text-base">
                        Rp {Number(relatedProduct.hargaUmum).toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
