/*
 * @Author: Libra
 * @Date: 2024-10-16 17:20:20
 * @LastEditors: Libra
 * @Description: 
 */
// @ts-check
import path from "path"
import ts from "rollup-plugin-typescript2"
import resolvePlugin from "@rollup/plugin-node-resolve"
import json from "@rollup/plugin-json"

const packagesDir = path.resolve(__dirname, "packages")

const packageDir = path.resolve(packagesDir, process.env.TARGET)

const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve("package.json"))
const name = path.basename(packageDir)

const outputOptions = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: "es",
  },
  "cjs": {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  "global": {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  }
}

function createConfig(format, output) {
  output.name = options.name
  output.sourcemap = true
  return {
    input: resolve("src/index.ts"),
    output: output,
    plugins: [
      json(),
      ts({
        tsconfig: path.resolve(__dirname, "tsconfig.json")
      }),
      resolvePlugin()
    ]
  }
}

const options = pkg.buildOptions
console.log(options)

export default options.formats.map(format => createConfig(format, outputOptions[format]))
