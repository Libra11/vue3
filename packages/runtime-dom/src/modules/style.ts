/**
 * 更新DOM元素的样式
 * @param el - 需要更新样式的DOM元素
 * @param prev - 之前的样式对象
 * @param next - 新的样式对象
 */
export const patchStyle = (el: Element, prev: any, next: any) => {
  // 获取元素的style对象
  const style = (el as HTMLElement).style;

  // 如果新样式为null，则移除整个style属性
  if (next === null) {
    el.removeAttribute("style");
  } else {
    // 处理样式更新
    if (prev) {
      // 遍历之前的样式，清除已不存在于新样式中的属性
      for (const key in prev) {
        if (!next[key]) {
          style[key as any] = "";
        }
      }
    }
    // 设置所有新的样式属性
    for (const key in next) {
      style[key as any] = next[key];
    }
  }
};
