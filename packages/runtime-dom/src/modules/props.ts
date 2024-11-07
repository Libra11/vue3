/*
 * @Author: Libra
 * @Date: 2024-11-07 15:12:17
 * @LastEditors: Libra
 * @Description:
 */
export const patchProps = (el: Element, key: string, value: any) => {
  (el as any)[key] = value;
};
