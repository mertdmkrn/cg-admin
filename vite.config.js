import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === "production" ? "/cg-admin/" : "/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.PNG'],
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, use: 'file-loader' },
    ]
  },
})
