export default {
  build: {
    outDir: 'public',
    emptyOutDir: true,
      publicDir: false,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
