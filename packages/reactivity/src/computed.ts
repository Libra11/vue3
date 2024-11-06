/*
 * @Author: Libra
 * @Date: 2024-10-17 13:32:08
 * @LastEditors: Libra
 * @Description:
 */
import { isFunction } from "@vue/shared";
import { effect } from "./effect";

export function computed(getterOrOptions: any) {
  let getter;
  let setter;

  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("computed value must be readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedRefImpl(getter, setter);
}

class ComputedRefImpl {
  private _value: any;
  private _effect: any;
  private _dirty: boolean = true;

  constructor(getter: any, private readonly _setter: any) {
    this._effect = effect(getter, {
      lazy: true,
      scheduler: () => {
        this._dirty = true;
      },
    });
  }

  // 获取 computed 的值的时候，才会执行 effect 函数
  // 收集依赖
  get value() {
    if (this._dirty) {
      this._value = this._effect();
      this._dirty = false;
    }
    return this._value;
  }

  // 设置 computed 的值， 触发更新， 执行 scheduler 函数
  // 将 _dirty 设置为 true， 下次访问 value 的时候，会重新执行 effect 函数
  set value(newValue) {
    this._setter(newValue);
  }
}
