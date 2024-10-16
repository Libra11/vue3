import { isIntegerKey, isMap } from "@vue/shared";
import { isArray } from "@vue/shared";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

/*
 * @Author: Libra
 * @Date: 2024-10-16 21:14:17
 * @LastEditors: Libra
 * @Description:
 */
export function effect(fn: Function, options: any = {}) {
  const effect = createReactiveEffect(fn, options);
  if (!options.lazy) effect();
  return effect;
}

let uid = 0;
let activeEffect: any;
// effect 栈，用于解决嵌套 effect 的问题
let effectStack: any[] = [];

function createReactiveEffect(fn: Function, options: any) {
  const effect = function reactiveEffect() {
    try {
      effectStack.push(effect);
      activeEffect = effect;
      return fn();
    } finally {
      effectStack.pop();
      activeEffect = effectStack[effectStack.length - 1];
    }
  };
  // 给 effect 添加唯一标识
  effect.id = uid++;
  // _isEffect 标识这是一个 effect
  effect._isEffect = true;
  // 保存原始函数
  effect.raw = fn;
  // 保存 options
  effect.options = options;
  return effect;
}

// 存储 effect 和 target 的关系
let targetMap = new WeakMap();
// targetMap 结构
/**
  targetMap = {
    target: {
      key: [effect, effect]
    }
  }
 */

export function track(
  target: object,
  key: string | symbol,
  type: TrackOpTypes
) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  if (!dep.has(activeEffect)) dep.add(activeEffect);
}

export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: string | symbol,
  newValue?: any,
  oldValue?: any
) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  let deps = [];
  // 数组长度变化,单独处理
  if (key === "length" && isArray(target)) {
    depsMap.forEach((dep: any, depKey: any) => {
      if (depKey === "length" || depKey >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case TriggerOpTypes.ADD:
        if (!isArray(target)) {
          // 对象新增属性
        } else if (isIntegerKey(key)) {
          // arr = [1, 2, 3]
          // arr[3] = 4
          // arr 的 length 属性变化了
          deps.push(depsMap.get("length"));
        }
        break;
      case TriggerOpTypes.SET:
        // 修改对象属性
        break;
    }
    console.log("deps", deps);
    deps.forEach((dep: any) => {
      dep.forEach((effect: any) => {
        effect();
      });
    });
  }
  console.log("deps", deps);
}
