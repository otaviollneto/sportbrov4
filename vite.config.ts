import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://sportbro.com.br",
        changeOrigin: true,
        secure: false, // Aceita certificados SSL autoassinados
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
