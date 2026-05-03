import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nox-coffee.vercel.app',
  output: 'static',
  adapter: vercel({ imageService: true }),
  integrations: [
    react({ include: ['**/islands/**'] }),
    sitemap(),
  ],
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('lenis')) return 'lenis';
          },
        },
      },
    },
  },
});
