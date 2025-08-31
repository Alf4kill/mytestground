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
        // Usando a fonte Inter conforme recomendado
        sans: ['DIN 1451', 'sans-serif'],
      },
      // Cores personalizadas ou outras extensões de tema podem vir aqui
    },
  },
  plugins: [],
};
export default config;