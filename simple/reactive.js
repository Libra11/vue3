/*
 * @Author: Libra
 * @Date: 2024-10-30 14:38:30
 * @LastEditors: Libra
 * @Description:
 */
function reactive(target) {
  return new Proxy(target, {
    get: createGetter(),
    set: createSetter(),
  });
}

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    track(target, key);
    return res;
  };
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver);
    trigger(target, key);
    return res;
  };
}

function effect(fn) {
  const effect = createReactiveEffect(fn, options);
  effect();
  return effect;
}

let uid = 0;
let activeEffect;

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    activeEffect = effect;
    return fn();
  };
  effect.id = uid++;
  effect._isEffect = true;
  effect.raw = fn;
  effect.options = options;
  return effect;
}

let targetMap = new WeakMap();

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) targetMap.set(target, (depsMap = new Map()));
  let dep = depsMap.get(key);
  if (!dep) depsMap.set(key, (dep = new Set()));
  if (!dep.has(activeEffect)) dep.add(activeEffect);
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  let deps = [];
  deps.push(depsMap.get(key));
  deps.forEach((dep) => {
    dep.forEach((effect) => {
      effect();
    });
  });
}

// test
const obj = reactive({
  name: "Libra",
  age: 20,
});

effect(() => {
  console.log("获取：", obj.name);
});

obj.name = "Libra2";
