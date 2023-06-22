import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/cg_admin/" : "/",
  assetsInclude: ['**/*.PNG'],
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|gif|svg)$/i, use: 'file-loader' },
    ]
  },
})
