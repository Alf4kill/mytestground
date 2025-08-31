'use client'; // Indica que este é um componente do cliente

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

// Interface para um item no carrinho, estendendo a interface Product e adicionando a quantidade
export interface CartItem extends Product {
  quantity: number;
}

// Interface para o contexto do carrinho, definindo as propriedades e funções disponíveis
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getCartTotalItems: () => number;
  updateQuantity: (productId: string, quantity: number) => void;
}

// Cria o contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto do carrinho
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false); // Para verificar se estamos no lado do cliente

  // Efeito para carregar o carrinho do localStorage ao montar o componente
  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Falha ao analisar o carrinho do localStorage:', error);
        setCartItems([]); // Resetar carrinho se a análise falhar
      }
    }
  }, []);

  // Efeito para salvar o carrinho no localStorage sempre que cartItems mudar
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  /**
   * Adiciona um produto ao carrinho. Se o produto já existir, incrementa a quantidade.
   * @param {Product} product - O produto a ser adicionado.
   */
  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  /**
   * Remove um produto do carrinho.
   * @param {string} productId - O ID do produto a ser removido.
   */
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  /**
   * Atualiza a quantidade de um produto no carrinho. Se a quantidade for <= 0, o item é removido.
   * @param {string} productId - O ID do produto a ser atualizado.
   * @param {number} quantity - A nova quantidade do produto.
   */
  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  /**
   * Retorna o número total de itens (quantidade) no carrinho.
   * @returns {number} O número total de itens.
   */
  const getCartTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotalItems, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook personalizado para acessar o contexto do carrinho.
 * @returns {CartContextType} O contexto do carrinho.
 * @throws {Error} Se usado fora de um CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
}