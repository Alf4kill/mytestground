import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
      },
      colors: {
        // Adicionando cores personalizadas
        'custom-blue': {
          '700': '#1d4ed8', // Exemplo de azul
          '200': '#bfdbfe', // Exemplo de azul claro para hover
        },
        'custom-gray': {
          '100': '#f3f4f6', // Exemplo de cinza de fundo
          '900': '#111827', // Exemplo de cinza para texto
        },
      },
    },
  },
  plugins: [],
};
export default config;
