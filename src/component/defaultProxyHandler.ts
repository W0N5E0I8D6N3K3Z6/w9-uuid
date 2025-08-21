/**
 * 默认代理处理函数
 * @param mainMap 映射表
 * @param config 覆盖配置
 * @returns 输出整合配置
 */
const main = (mainMap: any = new Map(), config: object = Object()): object => {
    return Object.assign(
        {
            /**
             * 处理 new 运算符（代理对象必须为函数）
             * @param target 目标对象
             * @param inputList 输入参数列表
             * @returns 默认输出一个新的代理
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct
             */
            construct: (target: any, inputList: any[]) => target(inputList?.entries()),

            /**
             * 编辑对象属性
             * @param target 目标对象
             * @param key 属性名称
             * @param input 输入属性修改值
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty
             */
            defineProperty: (target: any, key: string, input: object) => false,

            /**
             * 删除对象
             * @param target 目标对象
             * @param key 属性名称
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty
             */
            deleteProperty: (target: any, key: string) => false,

            /**
             * 获取对象
             * @param target 目标对象
             * @param key 属性名称
             * @returns 对象值
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get
             */
            get: (target: any, key: string) => mainMap.get(key),

            /**
             * 获取对象属性
             * @param target 目标对象
             * @param key 属性名称
             * @returns 对象属性
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor
             */
            getOwnPropertyDescriptor: (target: any, key: string) => Object.getOwnPropertyDescriptor(Object.fromEntries(mainMap), key),

            /**
             * 获取对象原型
             * @param target 目标对象
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getPrototypeOf
             */
            getPrototypeOf: (target: any) => null,

            /**
             * 处理 in 操作符
             * @param target 目标对象
             * @param key 属性名称
             * @returns 是否存在
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has
             */
            has: (target: any, key: string) => mainMap.has(key),

            /**
             * 对象扩展性检查
             * @param target 目标对象
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible
             */
            isExtensible: (target: any) => false,

            /**
             * 获取对象名称列表
             * @param target 目标对象
             * @returns 对象名称列表
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys
             */
            ownKeys: (target: any) => Array.from(mainMap.keys()),

            /**
             * 扩展性检查
             * @param target 目标对象
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions
             */
            preventExtensions: (target: any) => false,

            /**
             * 对象赋值
             * @param target 目标对象
             * @param key 属性名称
             * @param value 新值
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set
             */
            set: (target: any, key: string, value: any) => false,

            /**
             * 对象原型链赋值
             * @param target 目标对象
             * @param key 属性名称
             * @returns 默认阻止
             * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/setPrototypeOf
             */
            setPrototypeOf: (target: any, key: string) => false,
        },
        config,
    );
};

// 默认导出
export default main;
