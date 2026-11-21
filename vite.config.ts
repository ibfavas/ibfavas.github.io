import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pageTitles } from './src/lib/pageTitles';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'static-route-titles',
      apply: 'build',
      enforce: 'post',
      generateBundle(_options, bundle) {
        const index = bundle['index.html'];
        if (index?.type !== 'asset' || typeof index.source !== 'string') {
          this.error('Missing built index.html for route titles');
        }
        for (const [route, title] of pageTitles) {
          if (route === '/') continue;
          const escaped = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
          this.emitFile({
            type: 'asset',
            fileName: route.slice(1) + '/index.html',
            source: index.source.replace(/<title>.*?<\/title>/, () => `<title>${escaped}</title>`),
          });
        }
      },
    },
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three'],
          'vendor-motion': ['framer-motion'],
          'vendor-markdown': ['react-markdown', 'remark-gfm']
        }
      }
    }
  }
});
