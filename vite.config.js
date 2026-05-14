import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes("node_modules")) return;
                    if (id.includes("framer-motion")) return "motion";
                    if (id.includes("lottie")) return "lottie";
                    if (id.includes("@radix-ui")) return "radix-ui";
                    if (
                        id.includes("react-day-picker") ||
                        id.includes("date-fns")
                    ) {
                        return "dates";
                    }
                    if (id.includes("lucide-react")) return "icons";
                    if (id.includes("axios")) return "axios";
                    if (id.includes("embla-carousel")) return "carousel";
                    if (id.includes("react-router")) return "router";
                    if (id.includes("@hookform") || id.includes("zod")) {
                        return "forms";
                    }
                    return "vendor";
                },
            },
        },
    },
});
