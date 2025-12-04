import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import tscAlias from "tsc-alias";

export default defineConfig({
  plugins: [
    react(),
    // 生成类型声明文件
    dts({
      entryRoot: path.resolve(__dirname, "lib"),
      outputDir: path.resolve(__dirname, "dist/types"),
      // 排除测试文件和故事书文件
      exclude: ["**/*.test.tsx", "**/*.stories.tsx"],
      // 自动生成类型声明
      insertTypesEntry: true,
    }),
  ],
  build: {
    // 库模式
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "bbcomponents",
      // 输出格式：ESModule + CommonJS
      formats: ["es"],
      // 文件名模板
      fileName: (format, entryName) =>
        `${entryName}.${format === "es" ? "mjs" : "cjs"}`,
    },
    // 分包配置（按需加载）
    rollupOptions: {
      // 外部化 React 相关依赖（避免打包进组件库）
      external: ["react", "react-dom"],
      output: {
        // 全局变量映射（UMD 模式下使用）
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        // 组件单独打包（支持按需引入）
        preserveModules: true,
        preserveModulesRoot: "src/components",
      },
    },
    // 输出目录
    outDir: "dist",
    // 清除旧构建产物
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 构建后处理路径别名
  optimizeDeps: {
    esbuildOptions: {
      tsconfig: path.resolve(__dirname, "tsconfig.build.json"),
    },
  },
  // 开发服务器配置（预览组件）
  server: {
    port: 3000,
    open: true,
  },
});

// 构建完成后处理 TypeScript 路径别名
afterBuild();

function afterBuild() {
  tscAlias({
    configFile: path.resolve(__dirname, "tsconfig.build.json"),
    outDir: path.resolve(__dirname, "dist"),
    watch: false,
  });
}
