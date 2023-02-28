import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const resolvePath = (pathStr) => resolve(__dirname, pathStr)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': resolvePath('./src'),
      '@assets': resolvePath('./src/assets'),
      '@utils': resolvePath('./src/utils'),
      '@api': resolvePath('./src/api'),
      '@components': resolvePath('./src/components'),
      '@store': resolvePath('./src/store'),
      '@views': resolvePath('./src/views'),
      '@router': resolvePath('./src/router'),
      '@hooks': resolvePath('./src/hooks'),
      '@service': resolvePath('./src/service'),
      '@types': resolvePath('./src/types')
    }
  },
})
