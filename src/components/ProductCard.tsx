import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} passHref
      className="block w-full max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
          unoptimized // Adicionado para desabilitar otimização do Next.js para imagens SVG
          onError={(e) => {
            // Fallback para imagem placeholder se a URL original falhar
            (e.target as HTMLImageElement).src = `https://placehold.co/400x300/CCCCCC/666666?text=Erro+Imagem`;
          }}
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p> {/* Exibe a categoria */}
        <p className="text-lg text-blue-600 font-bold">R$ {product.price.toFixed(2)}</p>
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          Ver Detalhes
        </button>
      </div>
    </Link>
  );
}