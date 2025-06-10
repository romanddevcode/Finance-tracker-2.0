import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Finance Tracker",
        short_name: "FinanceApp",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#00b894",
        icons: [
          {
            src: "/src/assets/favicon-32x32.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/assets/favicon-32x32.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
