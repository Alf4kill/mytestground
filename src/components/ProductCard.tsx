import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} passHref
      className="grid grid-rows-[max-content] w-full max-w-sm mx-auto bg-de-stijl-white border-4 border-de-stijl-black overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-de-stijl-red">
      <div className="relative w-full h-48 sm:h-56 md:h-64">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          unoptimized // Adicionado para desabilitar otimização do Next.js para imagens SVG
          onError={(e) => {
            // Fallback para imagem placeholder se a URL original falhar
            (e.target as HTMLImageElement).src = `https://placehold.co/400x300/FDE74C/000000?text=Imagem+nao+encontrada`;
          }}
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center justify-evenly">
        <h3 className="text-xl font-semibold text-de-stijl-black mb-2 uppercase">{product.name}</h3>
        <p className="text-sm text-de-stijl-black mb-2 uppercase">{product.category}</p> {/* Exibe a categoria */}
        <p className="text-lg text-de-stijl-blue font-bold uppercase">R$ {product.price.toFixed(2)}</p>
        <button
          className="mt-4 px-6 py-2 bg-de-stijl-red text-de-stijl-white uppercase text-white font-medium rounded-lg shadow-md hover:de-stijl-blue focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label={`Ver detalhes de ${product.name}`}
        >
          Ver Detalhes
        </button>
      </div>
    </Link>
  );
}