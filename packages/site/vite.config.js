import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkFrontMatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@vitejs/plugin-react";

const options = {
  remarkPlugins: [
    remarkParse,
    [remarkToc, { maxDepth: 3, heading: "目录", tight: true }],
    [remarkFrontMatter, { type: "yaml", marker: "-" }],
    [remarkMdxFrontmatter, { name: "meta" }],
    remarkGfm,
  ],
  rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // build.rollupOptions.output.manualChunks
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  define: {
    GLOBAL_BBKING_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  plugins: [
    react(),
    mdx(options),
    VitePWA({
      injectRegister: "auto",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
        "Logo.svg",
      ],
      devOptions: {
        enabled: true,
        /* other options */
      },
      workbox: {
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/zjh-im-res\.oss-cn-shenzhen\.aliyuncs\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "oss-resource-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest: {
        name: "bbki.ng",
        short_name: "bbki.ng",
        description: "words, pictures",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
