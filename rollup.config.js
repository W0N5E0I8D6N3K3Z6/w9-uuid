/* ---------- 内置依赖 ---------- */
import { resolve } from "path";

/* ---------- 第三方依赖 ---------- */
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

// 配置
export default {
    input: resolve("src", "main.ts"),
    output: [
        {
            file: "lib/main.d.ts",
            format: "es",
            plugins: [dts()],
        },
        {
            file: `lib/main.js`, // 文件名
            format: "es",
        },
        {
            file: `lib/main.umd.js`, // 文件名
            format: "umd",
            name: "uuid",
        },
    ].map(($) => {
        $.plugins = $.plugins || [commonjs(), terser(), typescript()];
        return $;
    }),
};
