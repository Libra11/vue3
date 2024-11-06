/*
 * @Author: Libra
 * @Date: 2024-10-17 10:28:46
 * @LastEditors: Libra
 * @Description:
 */
import { hasChanged, isArray } from "@vue/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

export function ref(value: any) {
  return createRef(value, false);
}

export function shallowRef(value: any) {
  return createRef(value, true);
}

export function toRef(target: any, key: string) {
  return new ObjectRefImpl(target, key);
}

export function toRefs(target: any) {
  const res: any = isArray(target) ? new Array(target.length) : {};
  for (let key in target) {
    res[key] = toRef(target, key);
  }
  return res;
}

function createRef(value: any, shallow: boolean) {
  return new RefImpl(value, shallow);
}

class RefImpl<T> {
  private _value: T;
  private _rawValue: T;

  public readonly __v_isRef = true;

  constructor(value: T, public readonly _shallow: boolean) {
    this._value = value;
    this._rawValue = value;
  }

  get value() {
    track(this, "value", TrackOpTypes.GET);
    return this._value;
  }

  set value(newVal) {
    this._value = newVal;
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = newVal;
      trigger(this, TriggerOpTypes.SET, "value", newVal);
    }
  }
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true;

  constructor(private readonly _object: T, private readonly _key: K) {}

  get value() {
    return this._object[this._key];
  }

  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
