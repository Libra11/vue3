/*
 * @Author: Libra
 * @Date: 2024-10-16 18:08:33
 * @LastEditors: Libra
 * @Description:
 */

export function reactive(target) {
  return createReactiveObject(target, false);
}

export function shallowReactive(target) {
  return createReactiveObject(target, false);
}

export function readonly(target) {
  return createReactiveObject(target, true);
}

export function shallowReadonly(target) {
  return createReactiveObject(target, true);
}

function createReactiveObject(target, isReadonly) {}
