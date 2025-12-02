import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  base: "/", // Changed from "./" to "/"
=======
  base: './',// This makes paths relative
>>>>>>> 6fc2c7fcdf1f428fd3097c095639ba823d16c895
  build: {
    outDir: "build", // or 'dist' based on your preference
  },
  optimizeDeps: {
    include: ['@azure/msal-browser'],
  },
});
