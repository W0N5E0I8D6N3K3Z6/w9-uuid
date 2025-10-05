/* ---------- 第三方依赖 ---------- */
import handler from "w9-default-proxy-handler";

/**
 * UUID（v4）生成器
 * @returns 输出UUID
 */
function v4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, ($) => {
        const r: number = Math.trunc(Math.random() * 16);
        return ($ === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
}

/**
 * UUID（v7）生成器
 * @returns 输出UUID
 */
function v7() {
    const t = Date.now().toString(16).padStart(12, "0"); // 获取 Unix 时间戳并在开头补 0 到 12 位
    return [
        t.slice(0, 8), // 提取开头的 8 位
        t.slice(8), // 提取结尾的 8 位
        "7" + v4().slice(15), // 拼接版本号和后续随机数
    ].join("-");
}

// 闭包生成
function main() {
    // 映射表
    const mainMap = new Map();
    mainMap.set("v4", v4);
    mainMap.set("v7", v7);

    // 输出代理
    return new Proxy(
        main,
        handler(mainMap, {
            // 函数调用
            apply: () => mainMap.get("v7")(),

            // 获取对象
            get: (target: any, key: string) => mainMap.get(key)?.(),
        }),
    );
}

// 写入版本号
main.version = VITE_LIB_VERSION;

// 默认导出
const use = main();
export default use;
