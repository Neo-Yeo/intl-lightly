import { defineConfig } from 'vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    lib:{
      entry:path.resolve(__dirname,'lib/index.ts'),
      name:'intl-lightly'
    },
    rollupOptions:{
      external:["react"]
    }
  }
})
