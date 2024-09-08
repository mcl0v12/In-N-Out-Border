// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
  ],
  build: {},
  vite: {},
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:site_name', content: 'In-N-Out Border by Fabian Daume' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' },
        { rel: 'icon', type: 'image/png', href: '/favicon-192x192.png', sizes: '192x192' },
        { rel: 'icon', type: 'image/png', href: '/favicon-512x512.png', sizes: '512x512' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0a1e40' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
      ],
    },
  },

  // Module und Plugins
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',  // Füge Pinia hier hinzu
  ],

  plugins: [
  ],

  // Runtime-Konfiguration
  runtimeConfig: {
    public: {
    },
  },

  // Zusätzliche Einstellungen
  compatibilityDate: '2024-04-03',
});
