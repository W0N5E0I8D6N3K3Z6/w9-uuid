/* ---------- 内部依赖 ---------- */
import defaultProxyHandler from "./component/defaultProxyHandler";
import v4 from "./component/v4";
import v7 from "./component/v7";

// 闭包生成
const main = () => {
    // 映射表
    const mainMap: any = new Map();
    mainMap.set("new", () => main());
    mainMap.set("v4", v4);
    mainMap.set("v7", v7);

    // 输出代理
    return new Proxy(
        mainMap.get("new"),
        defaultProxyHandler(mainMap, {
            // 函数调用
            apply: () => mainMap.get("v7")(),

            // 获取对象
            get: (target: any, key: string) => mainMap.get(key)?.(),
        }),
    );
};

// 默认导出
export default main();
