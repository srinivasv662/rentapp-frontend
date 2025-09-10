import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // correct backend port
        changeOrigin: true,
        secure: false,
      },
    },
    allowedHosts: [
      "40f6635e6bdf.ngrok-free.app", // 👈 add your ngrok host here
    ],
  },
});
