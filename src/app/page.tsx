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
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-de-stijl-red mx-auto mb-4"></div>
        <p className="text-lg text-de-stijl-white">Carregando produtos...</p>
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

  return (
    <section className="py-8">
      <h2 className="text-4xl font-extrabold text-center text-de-stijl-white mb-10 uppercase tracking-widest">Nossos Produtos</h2>

      {/* Seletor de Categorias */}
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`font-raleway px-5 py-2 border-4 border-de-stijl-black rounded-none font-medium transition-colors duration-200 uppercase
              ${selectedCategory === category
                ? 'bg-de-stijl-red text-de-stijl-white'
                : 'bg-de-stijl-white text-de-stijl-black hover:bg-de-stijl-black'
              }
              focus:outline-none focus:ring-2 focus:ring-de-stijl-red focus:ring-offset-2`}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-10 text-de-stijl-white text-xl">
          Nenhum produto encontrado nesta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}