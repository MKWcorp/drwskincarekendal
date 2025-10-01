import { notFound } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import BuyButton from "@/components/BuyButton";

const prisma = new PrismaClient();

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {product.fotoProduk && (
            <Image 
              src={product.fotoProduk} 
              alt={product.namaProduk} 
              width={500} 
              height={500} 
              className="rounded-lg shadow-lg w-full object-cover" 
            />
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
