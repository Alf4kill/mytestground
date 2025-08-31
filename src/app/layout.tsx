import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext'; // Apenas importa o CartProvider
import CartIcon from '@/components/CartIcon'; // Importa o CartIcon separado
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Minha Loja Online',
  description: 'Um website de loja de produtos mockados criado com Next.js e TypeScript.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`bg-gray-100 text-gray-900 min-h-screen flex flex-col`}>
        {/* Envolve toda a aplicação com o CartProvider para que o contexto do carrinho esteja disponível */}
        <CartProvider>
          {/* Cabeçalho da aplicação */}
          <header className="bg-blue-700 text-white shadow-md p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold uppercase">
                <Link href="/" className="hover:text-blue-200 transition-colors duration-200 uppercase">
                  Minha Loja
                </Link>
              </h1>
              <nav className="flex items-center space-x-6">
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="hover:underline text-lg uppercase">Início</Link>
                  </li>
                  {/* Adicione mais links de navegação aqui, se necessário */}
                </ul>
                <CartIcon />
              </nav>
            </div>
          </header>

          {/* Conteúdo principal da aplicação */}
          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Rodapé da aplicação */}
          <footer className="bg-blue-700 text-white p-4 text-center mt-auto shadow-inner uppercase">
            <p>&copy; {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}