/*
 * @Author: Libra
 * @Date: 2024-11-07 14:57:16
 * @LastEditors: Libra
 * @Description:
 */
import { isOn, isString } from "@vue/shared";
import { patchAttr } from "./modules/attrs";
import { patchClass } from "./modules/class";
import { patchEvent } from "./modules/events";
import { patchStyle } from "./modules/style";
import { patchProps } from "./modules/props";

export const patchProp = (
  el: Element,
  key: string,
  prevValue: any,
  nextValue: any
) => {
  if (key === "class") {
    patchClass(el, nextValue);
  }
  if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  }

  // 是否为事件监听器
  if (isOn(key)) {
    patchEvent(el, key, prevValue, nextValue);
  } else {
    patchAttr(el, key, nextValue);
  }
  // attrs: 使用 setAttribute/removeAttribute 方法
  // props: 直接设置对象属性 el[key] = value
  // Vue 会根据属性的性质选择合适的方式来更新 DOM。
  if (false) {
    patchProps(el, key, nextValue);
  }
};
