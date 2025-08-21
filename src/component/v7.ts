/* ---------- 内部依赖 ---------- */
import v4 from "./v4";

/**
 * UUID（v7）生成器
 * @returns 输出UUID
 */
const main = () => {
    const t: string = Date.now().toString(16).padStart(12, "0"); // 获取 Unix 时间戳并在开头补 0 到 12 位
    return [
        t.slice(0, 8), // 提取开头的 8 位
        t.slice(8), // 提取结尾的 8 位
        "7" + v4().slice(15), // 拼接版本号和后续随机数
    ].join("-");
};

// 默认导出
export default main;
