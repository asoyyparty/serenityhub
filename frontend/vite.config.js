import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'robots.txt',
          'apple-touch-icon.png',
          'apple-touch-icon-180x180.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'favicon.png',
        ],
        manifest: {
          name: 'SerenityHub App',
          short_name: 'SerenityHub',
          theme_color: '#333333',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: new RegExp('https://.{0,3}tile.openstreetmap.org'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'openstreetmap-tiles',
              },
            },
            {
              urlPattern: 'http://localhost:5500',
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'serenitylink-image',
              },
              
            },
            {
              urlPattern: new RegExp('^https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'marker',
              },
              
            },
           
          ],
        },
      }),
    ],
    server: {
      port: 8002,
      allowedHosts: ['serenityhub.asoyydev.id'],
    },
    preview: {
      port: 8002,
      allowedHosts: ['serenityhub.asoyydev.id'],
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 150,
    },
  };
});
