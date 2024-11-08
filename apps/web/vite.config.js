// import path from 'path';
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import jsconfigPaths from 'vite-jsconfig-paths';

// export default defineConfig({
//   plugins: [react(), jsconfigPaths()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
