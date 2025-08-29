/* ---------- 内置依赖 ---------- */
import { readFileSync } from "fs";
import { resolve } from "path";

/* ---------- 第三方依赖 ---------- */
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

/* ---------- 配置信息 ---------- */
const pkg = JSON.parse(readFileSync("package.json", "utf8"));

// 配置
export default {
    input: resolve("src", "main.ts"),
    output: ["es", "umd"].map((format) => ({
        file: resolve("lib", `main.${format}.js`),
        name: pkg.name,
        format,
    })),
    plugins: [nodeResolve(), commonjs(), terser(), typescript()],
};
