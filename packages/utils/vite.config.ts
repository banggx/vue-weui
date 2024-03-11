import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          dir: resolve(__dirname, './dist/lib')
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'vueWeuiUtils'
    }
  },
  plugins: [
    dts({
      outputDir: [
        resolve(__dirname, './dist/es'),
        resolve(__dirname, './dist/lib')
      ],
      tsConfigFilePath: '../../tsconfig.json'
    })
  ]
});
