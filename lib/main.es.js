function o(t) {
  if (t instanceof Function)
    return function n(...e) {
      return e.length < t.length ? n.bind(null, ...e) : t.call(null, ...e);
    };
}
o.version = "00.10.05";
function s(t, n) {
  return t(...n);
}
function x(t, n, e) {
  return !1;
}
function f(t, n) {
  return r(t) ? (t.delete(n), !0) : !1;
}
function a(t, n, e) {
  return r(n) && n.get(e) || t.get(e);
}
function l(t, n, e) {
  return Object.getOwnPropertyDescriptor?.(Object.fromEntries(t), e);
}
function p(t) {
  return null;
}
function g(t, n, e) {
  return r(n) && n.has(e) || t.has(e);
}
function r(t) {
  return t instanceof Map;
}
function y(t, n) {
  return r(n) ? Array.from(n.keys()) : Array.from(t.keys());
}
function v(t) {
  return r(t);
}
function O(t, n, e) {
  return r(t) ? (t.set(n, e), !0) : !1;
}
function P(t, n) {
  return !1;
}
function i(t = /* @__PURE__ */ new Map(), n = Object()) {
  if (t instanceof Map)
    return Object.assign(
      {
        construct: s,
        defineProperty: x,
        deleteProperty: f,
        get: o(a)(t),
        getOwnPropertyDescriptor: o(l)(t),
        getPrototypeOf: p,
        has: o(g)(t),
        isExtensible: r,
        ownKeys: o(y)(t),
        preventExtensions: v,
        set: O,
        setPrototypeOf: P
      },
      n
    );
}
i.version = "00.10.05";
const b = o(i);
function c() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
    const n = Math.trunc(Math.random() * 16);
    return (t === "x" ? n : n & 3 | 8).toString(16);
  });
}
function d() {
  const t = Date.now().toString(16).padStart(12, "0");
  return [
    t.slice(0, 8),
    // 提取开头的 8 位
    t.slice(8),
    // 提取结尾的 8 位
    "7" + c().slice(15)
    // 拼接版本号和后续随机数
  ].join("-");
}
function u() {
  const t = /* @__PURE__ */ new Map();
  return t.set("v4", c), t.set("v7", d), new Proxy(
    u,
    b(t, {
      // 函数调用
      apply: () => t.get("v7")(),
      // 获取对象
      get: (n, e) => t.get(e)?.()
    })
  );
}
u.version = "00.10.05";
const h = u();
export {
  h as default
};
