'use client';

import { notFound } from "next/navigation";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";
import { useState, useEffect } from "react";
import Link from "next/link";

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

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

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
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Navigation */}
      <div className="mb-6">
        <Link 
          href="/product" 
          className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
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
            
            <BuyButton 
              productName={product.namaProduk} 
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
