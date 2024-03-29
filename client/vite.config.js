import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 3000,

  //   //Get rid of the CORS error
  //   proxy: {
  //     "/api": {
  //       // target: "http://localhost:5000",
  //       target: "https://threads-server-wor5.onrender.com",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },

  define: {
    "process.env.REACT_APP_API_URL": JSON.stringify(
      process.env.REACT_APP_API_URL
    ),
  },
});
