/*
 * @Author: Libra
 * @Date: 2024-10-16 17:09:23
 * @LastEditors: Libra
 * @Description: 
 */
const fs = require("fs")
const path = require("path")
const execa = require("execa")

const dirs = fs.readdirSync("packages").filter(p => {
  if (!fs.statSync(`packages/${p}`).isDirectory()) {
    return false
  }
  return true
})

function runParallel(dirs, build) {
  let res = []
  for (const dir of dirs) {
    res.push(build(dir))
  }
  return Promise.all(res)
}

async function build(dir) {
  await execa("rollup", ["-cw", "--environment", `TARGET:${dir}`], {
      stdio: "inherit"
    })
}

runParallel(dirs, build).then(() => {
  console.log("build success")
})
