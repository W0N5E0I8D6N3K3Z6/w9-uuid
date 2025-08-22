/* ---------- 内置依赖 ---------- */
import { resolve } from "path";

/* ---------- 第三方依赖 ---------- */
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// 配置
export default {
    input: resolve("src", "main.ts"),
    output: ["es", "umd"].map((format) => ({
        file: resolve("lib", `main.${format}.js`),
        name: "default-proxy-handler",
        format,
    })),
    plugins: [commonjs(), terser(), typescript()],
};
