/*
 * @Author: Libra
 * @Date: 2024-11-07 15:12:21
 * @LastEditors: Libra
 * @Description:
 */

/**
 * 更新 DOM 元素的事件监听器
 * @param el - DOM 元素，扩展了 _vei 属性用于存储事件处理函数
 * @param key - 事件名称（例如：onClick, onMousedown）
 * @param prevValue - 之前的事件处理函数
 * @param nextValue - 新的事件处理函数
 */
export const patchEvent = (
  el: Element & { _vei?: Record<string, any> },
  key: string,
  prevValue: any,
  nextValue: any
) => {
  // _vei (vue event invokers) 用于存储元素的所有事件处理函数
  const invokers = el._vei || (el._vei = {});
  // 获取当前事件的处理函数
  const existingInvoker = invokers[key];

  // 如果有新的事件处理函数，且之前已经绑定过事件
  if (nextValue && existingInvoker) {
    // 直接更新处理函数，不需要重新绑定
    existingInvoker.value = nextValue;
  } else {
    // 从事件名中移除 'on' 前缀并转换为小写
    // 例如：onClick -> click, onMouseDown -> mousedown
    const eventName = key.slice(2).toLowerCase();

    if (nextValue) {
      // 如果有新的事件处理函数，添加事件监听器
      el.addEventListener(eventName, nextValue);
    } else {
      // 如果没有新的处理函数，移除之前的事件监听器
      el.removeEventListener(eventName, existingInvoker);
      // 清除存储的处理函数
      invokers[key] = undefined;
    }
  }
};
