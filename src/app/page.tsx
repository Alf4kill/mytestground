'use client'; // Indica que este é um componente do cliente

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts, getAllCategories } from '@/lib/data';
import { Product } from '@/types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const fetchedProducts = await getAllProducts(selectedCategory === 'Todas' ? null : selectedCategory);
        setProducts(fetchedProducts);
        const fetchedCategories = await getAllCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Não foi possível carregar os produtos ou categorias.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [selectedCategory]); // Refetch quando a categoria selecionada muda

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700 uppercase">Carregando produtos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 text-xl font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 uppercase">Nossos Produtos</h2>

      {/* Seletor de Categorias */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`font-raleway px-5 py-2 rounded-full font-medium transition-colors duration-200 uppercase
              ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-md uppercase'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 uppercase'
              }
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-xl uppercase">
          Nenhum produto encontrado nesta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}