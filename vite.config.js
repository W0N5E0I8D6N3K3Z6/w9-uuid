/* ---------- 内置依赖 ---------- */
import ph from "path";
import os from "os";
import fs from "fs";

/* ---------- 第三方依赖 ---------- */
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import xe from "xe-utils";

/* ---------- 配置文件 ---------- */
import pkg from "./package.json";
const date = new Date(); // 编译时间
const year = date.getFullYear() - 2025; // 生成大版本号
pkg.version = (year > 0 ? year : `0${year}`) + xe.toDateString(new Date(), ".MM.dd"); // 替换版本号
fs.writeFileSync(ph.resolve("package.json"), JSON.stringify(pkg, null, 4)); // 刷新配置文件
fs.writeFileSync(ph.resolve("types", "vite-define.d.ts"), ""); // 清空声明文件

/* ---------- 导出配置 ---------- */
export default defineConfig({
    /**
     * 构建选项
     * https://vitejs.cn/vite5-cn/config/build-options.html
     */
    build: {
        outDir: "lib",
        /**
         * 库模式
         * https://vitejs.cn/vite5-cn/guide/build.html#library-mode
         */
        lib: {
            entry: ph.resolve(__dirname, "src", "main.ts"),
            name: xe.camelCase(pkg.name),
            formats: ["es", "umd"],
            fileName: (format) => `main.${format}.js`,
        },
    },

    /**
     * 常量
     * https://vitejs.cn/vite3-cn/config/shared-options.html#define
     */
    define: Object.entries(pkg).reduce((obj, [key, value]) => {
        // 只处理字符串
        if (xe.isString(value)) {
            key = `VITE_LIB_${xe.camelCase(key).toUpperCase()}`; // 常量名称
            obj[key] = JSON.stringify(value); // 记录
            fs.appendFileSync(ph.resolve("types", "vite-define.d.ts"), `declare const ${key}: string;\n`); // 输出声明
        }

        // 回参
        return obj;
    }, Object()),

    /**
     * 插件
     * https://vitejs.cn/vite5-cn/config/shared-options.html#plugins
     */
    plugins: [dts()],
});
