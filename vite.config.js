import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: "https://ethreads-social-media.vercel.app/",

    //Get rid of the CORS error
    proxy: {
      "/api": {
        target: "https://threads-server-wor5.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
