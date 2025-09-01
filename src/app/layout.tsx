import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import CartIcon from '@/components/CartIcon';
import { ReactNode } from 'react';
import { Raleway } from 'next/font/google';

// Configuração da fonte Raleway
const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
});

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
      {/* Aplicando a classe da fonte no body */}
      <body className={`${raleway.variable} font-raleway bg-custom-gray-100 text-custom-gray-900 min-h-screen flex flex-col`}>
        <CartProvider>
          {/* Usando cores personalizadas no cabeçalho */}
          <header className="bg-custom-blue-700 text-white shadow-md p-4 sticky top-0 z-10">
            <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold uppercase">
                {/* Usando cor personalizada no link */}
                <Link href="/" className="hover:text-custom-blue-200 transition-colors duration-200 uppercase">
                  Minha Loja
                </Link>
              </h1>
              <nav className="flex items-center space-x-6">
                <ul className="flex space-x-4">
                  <li>
                    <Link href="/" className="hover:underline text-lg uppercase">Início</Link>
                  </li>
                </ul>
                <CartIcon />
              </nav>
            </div>
          </header>

          <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>

          {/* Usando cores personalizadas no rodapé */}
          <footer className="bg-custom-blue-700 text-white p-4 text-center mt-auto shadow-inner uppercase">
            <p>&copy; {new Date().getFullYear()} Minha Loja. Todos os direitos reservados.</p>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
