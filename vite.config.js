import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss('./tailwind.config.js')],
  define: {
    'process.env.GOOGLE_APPLICATION_CREDENTIALS': JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  },
});
