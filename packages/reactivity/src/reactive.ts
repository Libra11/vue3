/*
 * @Author: Libra
 * @Date: 2024-10-16 18:08:33
 * @LastEditors: Libra
 * @Description:
 */
import { isObject } from "@vue/shared";
import {
  reactiveHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandler";

export function reactive(target: object) {
  return createReactiveObject(target, false, reactiveHandlers);
}

export function shallowReactive(target: object) {
  return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target: object) {
  return createReactiveObject(target, true, readonlyHandlers);
}

export function shallowReadonly(target: object) {
  return createReactiveObject(target, true, shallowReadonlyHandlers);
}

// 缓存, 避免重复代理
// WeakMap 自动进行垃圾回收
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

function createReactiveObject(
  target: object,
  isReadonly: boolean,
  handlers: ProxyHandler<any>
) {
  if (!isObject(target)) return target;
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) return existingProxy;
  const proxy = new Proxy(target, handlers);
  proxyMap.set(target, proxy);
  return proxy;
}
