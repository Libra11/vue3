/*
 * @Author: Libra
 * @Date: 2024-10-16 20:32:27
 * @LastEditors: Libra
 * @Description:
 */

import {
  hasChanged,
  hasOwn,
  isArray,
  isIntegerKey,
  isObject,
} from "@vue/shared";
import { reactive, readonly } from "./reactive";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { track, trigger } from "./effect";

function createGetter(isReadonly = false, shallow = false) {
  return function get(target: object, key: string | symbol, receiver: object) {
    // 通过 Reflect 反射调用， 获取 target[key] 的值
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 依赖收集
      track(target, key, TrackOpTypes.GET);
    }
    if (shallow) return res;
    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res);
    return res;
  };
}

function createSetter(shallow = false) {
  return function set(
    target: any,
    key: string | symbol,
    value: any,
    receiver: object
  ) {
    const oldValue = (target as any)[key];
    const hadKey =
      isArray(target) && isIntegerKey(key)
        ? Number(key) < target.length
        : hasOwn(target, key);
    console.log("hadKey", hadKey);
    const res = Reflect.set(target, key, value, receiver);
    if (!hadKey) {
      // 新增
      trigger(target, TriggerOpTypes.ADD, key, value);
    } else if (hasChanged(value, oldValue)) {
      // 修改
      trigger(target, TriggerOpTypes.SET, key, value, oldValue);
    }
    return res;
  };
}

// Getter
const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

// Setter
const set = createSetter();
const shallowSet = createSetter(true);

export const reactiveHandlers: ProxyHandler<object> = {
  get,
  set,
};
export const shallowReactiveHandlers: ProxyHandler<object> = {
  get: shallowGet,
  set: shallowSet,
};
export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set(target, key) {
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
};
export const shallowReadonlyHandlers: ProxyHandler<object> = {
  get: shallowReadonlyGet,
  set(target, key) {
    console.warn(
      `Set operation on key "${String(key)}" failed: target is readonly.`,
      target
    );
    return true;
  },
};
