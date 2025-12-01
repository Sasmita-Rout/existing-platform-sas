import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/existing-platform-sas/',// This makes paths relative
  build: {
    outDir: "build", // or 'dist' based on your preference
  },
  optimizeDeps: {
    include: ['@azure/msal-browser'],
  },
});
