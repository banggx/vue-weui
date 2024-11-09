/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import DefineOptions from 'unplugin-vue-define-options/vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', /\.less/],
      input: ['./index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          exports: 'named',
          dir: '../vue-weui/es'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          dir: '../vue-weui/lib'
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'vueWeui'
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: './src',
      outputDir: ['../vue-weui/es/src', '../vue-weui/lib/src'],
      tsConfigFilePath: '../../tsconfig.json'
    }),
    DefineOptions(),
    {
      name: 'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle);

        for (const key of keys) {
          const bundler: any = bundle[key as any];
          // 将所有文件引入的less转化为css
          this.emitFile({
            type: 'asset',
            fileName: key,
            source: bundler.code.replace(/\.less/g, '.css')
          });
        }
      }
    }
  ],
  test: {
    environment: 'happy-dom',
    include: ['./src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    coverage: {
      provider: 'v8',
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/scripts/**',
        '**/*.d.ts',
        '**/index.ts',
        '**/types.ts',
        '**/src/utils/**'
      ]
    }
  }
});
