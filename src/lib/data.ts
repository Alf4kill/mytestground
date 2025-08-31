import { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    price: 49.90,
    description: 'Uma camiseta de algodão super confortável, perfeita para o dia a dia.',
    imageUrl: 'https://placehold.co/400x300/F2F2F2/333333?text=Camiseta+Basica',
    category: 'Roupas',
  },
  {
    id: '2',
    name: 'Calça Jeans Skinny',
    price: 129.90,
    description: 'Calça jeans com lavagem escura e modelagem skinny, ideal para um visual moderno.',
    imageUrl: 'https://placehold.co/400x300/E0E0E0/222222?text=Calca+Jeans',
    category: 'Roupas',
  },
  {
    id: '3',
    name: 'Tênis Esportivo',
    price: 249.90,
    description: 'Tênis leve e respirável, excelente para corridas e atividades físicas.',
    imageUrl: 'https://placehold.co/400x300/D0D0D0/111111?text=Tenis+Esportivo',
    category: 'Calçados',
  },
  {
    id: '4',
    name: 'Moletom com Capuz',
    price: 99.90,
    description: 'Moletom macio com capuz e bolso canguru, perfeito para os dias frios.',
    imageUrl: 'https://placehold.co/400x300/C0C0C0/000000?text=Moletom',
    category: 'Roupas',
  },
  {
    id: '5',
    name: 'Blusa de Lã',
    price: 79.90,
    description: 'Blusa de lã aconchegante, ideal para o inverno.',
    imageUrl: 'https://placehold.co/400x300/B0B0B0/555555?text=Blusa+de+La',
    category: 'Roupas',
  },
  {
    id: '6',
    name: 'Saia Plissada',
    price: 89.90,
    description: 'Saia plissada elegante, perfeita para um look sofisticado.',
    imageUrl: 'https://placehold.co/400x300/A0A0A0/666666?text=Saia+Plissada',
    category: 'Roupas',
  },
  {
    id: '7',
    name: 'Óculos de Sol',
    price: 189.90,
    description: 'Óculos de sol com proteção UV e design moderno.',
    imageUrl: 'https://placehold.co/400x300/909090/777777?text=Oculos+de+Sol',
    category: 'Acessórios',
  },
  {
    id: '8',
    name: 'Relógio Analógico',
    price: 299.90,
    description: 'Relógio analógico clássico com pulseira de couro.',
    imageUrl: 'https://placehold.co/400x300/808080/888888?text=Relogio+Analogico',
    category: 'Acessórios',
  },
];

/**
 * Retorna todos os produtos mockados, opcionalmente filtrados por categoria.
 * @param {string | null} category - A categoria para filtrar, ou null para todos os produtos.
 * @returns {Product[]} Um array de objetos Product.
 */
export async function getAllProducts(category: string | null = null): Promise<Product[]> {
  // Simula uma chamada de API assíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category) {
        resolve(mockProducts.filter(product => product.category === category));
      } else {
        resolve(mockProducts);
      }
    }, 500); // Pequeno atraso para simular carregamento
  });
}

/**
 * Retorna um produto específico pelo ID.
 * @param {string} id - O ID do produto a ser encontrado.
 * @returns {Product | undefined} O objeto Product se encontrado, caso contrário, undefined.
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simula uma chamada de API assíncrona
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.find(product => product.id === id));
    }, 300); // Pequeno atraso para simular carregamento
  });
}

/**
 * Retorna todas as categorias únicas de produtos.
 * @returns {string[]} Um array de strings com os nomes das categorias.
 */
export async function getAllCategories(): Promise<string[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const categories = [...new Set(mockProducts.map(product => product.category))];
      resolve(['Todas', ...categories]); // Adiciona "Todas" como uma opção
    }, 200);
  });
}