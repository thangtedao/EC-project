import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port:4000,
    proxy: {
      "/api": {
        target: "http://localhost:3001/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// export default {
//   base: "/admin",
// };

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:3001/api",
//       },
//     },
//   },
//   base: "/admin/",
//   build: {
//     assetsDir: "assets",
//   },
// });
