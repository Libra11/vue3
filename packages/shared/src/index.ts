/*
 * @Author: Libra
 * @Date: 2024-10-16 16:58:34
 * @LastEditors: Libra
 * @Description:
 */
export const isObject = (val: unknown) =>
  typeof val === "object" && val !== null;

export const isArray = (val: unknown) => Array.isArray(val);
export const isFunction = (val: unknown) => typeof val === "function";
export const isString = (val: unknown) => typeof val === "string";
export const isNumber = (val: unknown) => typeof val === "number";
export const isBoolean = (val: unknown) => typeof val === "boolean";
export const isSymbol = (val: unknown) => typeof val === "symbol";
export const objectToString = Object.prototype.toString;
export const toTypeString = (value: unknown): string =>
  objectToString.call(value);
export const isMap = (val: unknown): val is Map<any, any> =>
  toTypeString(val) === "[object Map]";

// 判断是否是正整数 key
export const isIntegerKey = (key: any): boolean =>
  isString(key) &&
  key !== "NaN" &&
  key[0] !== "-" &&
  "" + parseInt(key, 10) === key;

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const hasChanged = (value: any, oldValue: any): boolean =>
  !Object.is(value, oldValue);

/**
 * 判断一个字符串是否为事件监听器的命名
 * 规则：以 "on" 开头，后面跟着一个大写字母
 * 例如: onClick, onMouseDown, onUpdate 等
 *
 * @param key - 要检查的字符串
 * @returns 是否符合事件监听器的命名规则
 */
export const isOn = (key: string): boolean =>
  // 检查第一个字符是否为 'o' (ASCII 码为 111)
  key.charCodeAt(0) === 111 /* o */ &&
  // 检查第二个字符是否为 'n' (ASCII 码为 110)
  key.charCodeAt(1) === 110 /* n */ &&
  // 检查第三个字符是否为大写字母
  // 大写字母的 ASCII 码范围是 65-90
  // 这里用排除小写字母(97-122)的方式来判断
  (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
