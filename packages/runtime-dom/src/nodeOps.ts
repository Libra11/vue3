/*
 * @Author: Libra
 * @Date: 2024-11-07 14:47:25
 * @LastEditors: Libra
 * @Description: DOM 操作的统一封装，提供跨平台的 DOM 操作能力
 */
export const nodeOps = {
  /**
   * 创建指定标签的 DOM 元素
   * @param tag - 标签名
   * @returns 新创建的 DOM 元素
   */
  createElement: (tag: string) => {
    return document.createElement(tag);
  },

  /**
   * 从父节点中移除指定的子节点
   * @param child - 需要移除的子节点
   */
  remove: (child: Node) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },

  /**
   * 将子节点插入到父节点的指定位置
   * @param child - 要插入的子节点
   * @param parent - 父节点
   * @param anchor - 锚点节点（插入位置）
   */
  insert: (child: Node, parent: Node, anchor: Node | null) => {
    parent.insertBefore(child, anchor);
  },

  /**
   * 设置元素的文本内容
   * @param el - 目标元素
   * @param text - 要设置的文本内容
   */
  setElementText: (el: Element, text: string) => {
    el.textContent = text;
  },

  /**
   * 根据选择器查找匹配的第一个元素
   * @param selector - CSS 选择器
   * @returns 匹配的元素或 null
   */
  querySelector: (selector: string) => {
    return document.querySelector(selector);
  },

  /**
   * 创建文本节点
   * @param text - 文本内容
   * @returns 新创建的文本节点
   */
  createText: (text: string) => {
    return document.createTextNode(text);
  },

  /**
   * 设置文本节点的内容
   * @param node - 文本节点
   * @param text - 新的文本内容
   */
  setText: (node: Text, text: string) => {
    node.nodeValue = text;
  },
};
