/*
 * @Author: Libra
 * @Date: 2024-10-31 16:12:25
 * @LastEditors: Libra
 * @Description:
 */
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

const renderOptions = Object.assign(nodeOps, { patchProp });

export { renderOptions };
