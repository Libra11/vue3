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
