/* ---------- 内置依赖 ---------- */
import { resolve } from "path";

/* ---------- 第三方依赖 ---------- */
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// 配置
export default [
    {
        output: [
            {
                file: resolve("lib", "main.d.ts"),
                format: "es",
            },
        ],
        plugins: [dts()],
    },
    {
        output: ["es", "umd"].map((format) => ({
            file: resolve("lib", `main.${format}.js`),
            name: "uuid",
            format,
        })),
        plugins: [commonjs(), terser(), typescript()],
    },
].map((config) => {
    config.input = resolve("src", "main.ts");
    return config;
});
