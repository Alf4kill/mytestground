const nextConfig = {
  images: {
    domains: ['placehold.co'],
    // Ou hostnames para Next.js 13 e superior
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;