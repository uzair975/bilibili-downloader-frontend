import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://biliextract.me',
  compressHTML: true,
  devToolbar: {
    enabled: false
  },
  server: {
    host: true,
    port: 4321
  },
  vite: {
    server: {
      allowedHosts: true,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true
        }
      }
    }
  },
  build: {
    format: 'directory'
  }
});
