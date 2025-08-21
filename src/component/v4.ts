/**
 * UUID（v4）生成器
 * @returns 输出UUID
 */
const main = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, ($) => {
        const r: number = Math.trunc(Math.random() * 16);
        return ($ === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
};

// 默认导出
export default main;
