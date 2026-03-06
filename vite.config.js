import { defineConfig } from 'vite'

export default defineConfig({
  base: '/Tongue/',
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
