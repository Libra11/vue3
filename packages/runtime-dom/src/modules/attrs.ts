/*
 * @Author: Libra
 * @Date: 2024-11-07 15:11:45
 * @LastEditors: Libra
 * @Description: 处理 DOM 元素的属性更新
 */
export const patchAttr = (el: Element, key: string, value: any) => {
  // 如果新的属性值为 null，则移除该属性
  if (value === null) {
    el.removeAttribute(key);
  } else {
    // 直接设置新的属性值
    el.setAttribute(key, value);
  }
};
