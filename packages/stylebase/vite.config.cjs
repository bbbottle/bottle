const { defineConfig } = require('vite');
const { resolve } = require('path');

module.exports = defineConfig({
  build: {
    lib: {
      name: '@bbki.ng/stylebase',
      fileName: 'index',
      entry: resolve(__dirname, 'lib/index.cjs'),
      formats: ['cjs'],
    },
  }
})
