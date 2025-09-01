'use client'; // Indica que este é um componente do cliente

import Link from 'next/link';
import Image from 'next/image';
import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext'; // Importa o hook do carrinho
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params; // Desestrutura o id do objeto params
  const { addToCart } = useCart(); // Usa a função addToCart do contexto
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const fetchedProduct = await getProductById(id);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          notFound(); // Redireciona para 404 se o produto não for encontrado
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Não foi possível carregar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]); // Usa o id desestruturado como dependência

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-de-stijl-red mx-auto mb-4"></div>
        <p className="text-lg text-de-stijl-white">Carregando detalhes do produto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-de-stijl-red text-xl font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] p-4 sm:p-6 lg:p-8">
      <div className="bg-de-stijl-white text-de-stijl-black border-4 border-de-stijl-black p-6 sm:p-8 md:p-10 max-w-4xl w-full flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Imagem do produto */}
        <div className="relative w-full md:w-1/2 h-64 sm:h-72 md:h-80 lg:h-96 flex-shrink-0">
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
            unoptimized // Adicionado para desabilitar otimização do Next.js para imagens SVG
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/600x450/FDE74C/000000?text=Erro+Imagem`;
            }}
          />
        </div>

        {/* Detalhes do produto */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-de-stijl-black mb-4 uppercase tracking-wider">{product.name}</h2>
            <p className="text-de-stijl-black text-sm mb-2">{product.category}</p> {/* Exibe a categoria */}
            <p className="text-de-stijl-black text-base sm:text-lg leading-relaxed mb-6">{product.description}</p>
            <p className="text-de-stijl-blue text-2xl sm:text-3xl font-extrabold mb-6 uppercase">R$ {product.price.toFixed(2)}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* Botão de adicionar ao carrinho */}
            <button
              className="w-full sm:w-auto px-8 py-3 bg-de-stijl-red text-de-stijl-white font-semibold rounded-none shadow-md hover:bg-de-stijl-blue focus:outline-none focus:ring-2 focus:ring-de-stijl-red focus:ring-offset-2 transition-colors duration-200 uppercase"
              onClick={() => {
                addToCart(product); // Adiciona o produto ao carrinho
                console.log(`Produto ${product.name} adicionado ao carrinho!`);
                // Poderia adicionar uma notificação de sucesso aqui
              }}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              Adicionar ao Carrinho
            </button>

            {/* Link para voltar à página inicial */}
            <Link href="/" passHref
              className="w-full sm:w-auto px-8 py-3 text-center border-4 border-de-stijl-black text-de-stijl-black font-semibold rounded-none shadow-sm hover:bg-de-stijl-white focus:outline-none focus:ring-2 focus:ring-de-stijl-red focus:ring-offset-2 transition-colors duration-200 uppercase"
              aria-label="Voltar para a página inicial"
            >
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
