import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import crossOriginIsolation from "vite-plugin-cross-origin-isolation";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontMatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import { visualizer } from "rollup-plugin-visualizer";

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
      "@": path.resolve(__dirname, "./src/blog"),
      "@bbki.ng/commponents": path.resolve(__dirname, "../components/lib"),
    },
    // preserveSymlinks: true,
  },
  // build.rollupOptions.output.manualChunks
  build: {
    sourcemap: true,
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
    glsl(),
    tailwindcss(),
    VitePWA({
      injectRegister: "auto",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
        "Logo.svg",
      ],
      devOptions: {
        enabled: false,
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
          {
            urlPattern: /new-content-handler/,
            method: "GET",
            handler: ({ event, data }) => {
              const url = new URL(event.request.url);
              const sharedContent = url.searchParams.get("text");

              // post the shared content to the main thread
              if (sharedContent) {
                window.postMessage(sharedContent, {});
              }
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic.com\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts",
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
        description: "A personal blog.",
        theme_color: "#ffffff",
        display: "fullscreen",
        start_url: "/",
        share_target: {
          action: "/new-content-handler/",
          method: "GET",
          params: {
            title: "title",
            text: "text",
            url: "url",
          },
        },
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
    crossOriginIsolation(),
    visualizer({ open: true, gzipSize: true }),
  ],
});
