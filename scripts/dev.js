/*
 * @Author: Libra
 * @Date: 2024-10-16 17:09:27
 * @LastEditors: Libra
 * @Description: 
 */
const execa = require("execa")

async function build(dir) {
  await execa("rollup", ["-cw", "--environment", `TARGET:${dir}`], {
    stdio: "inherit"
  })
}

build("reactivity")


