import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    VueMacros.vite({
      plugins: {
        vue: vue()
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/assets/scss/variables.scss";`
      }
    }
  },
})


// "unplugin-vue-macros": "^2.5.1",

// "@tsconfig/node18": "^18.2.0",
// "@types/node": "^18.17.0",
