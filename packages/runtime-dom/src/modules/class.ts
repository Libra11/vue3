/*
 * @Author: Libra
 * @Date: 2024-11-07 14:57:57
 * @LastEditors: Libra
 * @Description: 处理 DOM 元素的 class 属性更新
 */

/**
 * 更新 DOM 元素的 class 属性
 * @param el - 需要更新的 DOM 元素
 * @param value - 新的 class 值，可以是字符串或 null
 */
export const patchClass = (el: Element, value: string | null) => {
  // 如果新的 class 值为 null，则移除整个 class 属性
  if (value === null) {
    el.removeAttribute("class");
  } else {
    // 直接设置新的 class 值
    el.className = value;
  }
};
