'use client'; // Indica que este é um componente do cliente

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Usa funções do contexto do carrinho

  // Calcula o subtotal de todos os itens no carrinho
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Mensagem para quando o carrinho estiver vazio
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 uppercase">Seu carrinho está vazio!</h2>
        <p className="text-lg text-gray-600 mb-8 uppercase">Parece que você ainda não adicionou nenhum item.</p>
        <Link href="/" passHref className="px-6 py-3 bg-blue-600 text-white uppercase font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
          Comece a comprar
        </Link>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 uppercase">Seu Carrinho</h2>
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 max-w-4xl mx-auto">
        {/* Mapeia e exibe cada item do carrinho */}
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b border-gray-200 py-4 last:border-b-0">
            {/* Imagem do produto no carrinho */}
            <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                unoptimized // Adicionado para desabilitar otimização do Next.js para imagens SVG
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/100x100/CCCCCC/666666?text=Erro`;
                }}
              />
            </div>
            {/* Detalhes do produto e categoria */}
            <div className="flex-grow text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800 uppercase">{item.name}</h3>
              <p className="text-gray-600 text-sm uppercase">Categoria: {item.category}</p>
              <p className="text-lg text-blue-600 font-bold uppercase">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
            {/* Controles de quantidade e remoção */}
            <div className="flex items-center space-x-2">
              <label htmlFor={`quantity-${item.id}`} className="sr-only uppercase">Quantidade para {item.name}</label>
              <input
                type="number"
                id={`quantity-${item.id}`}
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500 uppercase"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="uppercase p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                aria-label={`Remover ${item.name} do carrinho`}
              >
                {/* SVG para ícone de lixeira/remover */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        {/* Exibe o total do carrinho */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800 uppercase">Total:</span>
          <span className="text-2xl font-extrabold text-blue-700 uppercase">R$ {calculateSubtotal().toFixed(2)}</span>
        </div>
        {/* Botão para finalizar compra */}
        <div className="mt-8 text-center">
          <button
            className="px-8 py-4 uppercase bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-xl"
            aria-label="Finalizar Compra"
            onClick={() => console.log('Finalizar Compra clicked')}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}