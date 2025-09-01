'use client'; // Marca este componente como um Client Component

import { useEffect, useState } from 'react'; // Importa useState e useEffect
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; // Importa o hook do carrinho

export default function CartIcon() {
  const { getCartTotalItems } = useCart();
  // Novo estado para controlar a hidratação no cliente
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // Este useEffect só roda no cliente, garantindo a hidratação
    setHasHydrated(true);
  }, []);

  const totalItems = getCartTotalItems();

  return (
    <Link href="/cart" passHref className="relative p-2 text-de-stijl-yellow hover:text-white transition-colors duration-200" aria-label="Ver carrinho de compras">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 sm:h-8 sm:w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {/* Renderiza a contagem de itens apenas após a hidratação no cliente */}
      {hasHydrated && totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-de-stijl-red text-de-stijl-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Link>
  );
}