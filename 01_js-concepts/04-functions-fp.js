// 04 — Functions and functional patterns

// --- Arity, defaults, and the arguments object ----------------------------
function three(a, b = 1, ...rest) {
  return [a, b, rest];
}
console.log(three.length); // 1 — counts params before the first default/rest
console.log(three(1, undefined, 3)); // [1, 1, [3]] — undefined triggers the default
console.log(three(1, null, 3)); // [1, null, [3]] — null does not

// --- Closures as private state --------------------------------------------
function makeCounter(start = 0) {
  let n = start;
  return {
    inc: () => ++n,
    read: () => n,
  };
}
const c = makeCounter(10);
c.inc();
c.inc();
console.log(c.read()); // 12 — `n` is unreachable from outside

// --- Currying and partial application -------------------------------------
const curry =
  (fn) =>
  function next(...args) {
    return args.length >= fn.length ? fn(...args) : (...more) => next(...args, ...more);
  };

const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)(3), add3(1, 2)(3), add3(1, 2, 3)); // 6 6 6

// --- Composition ----------------------------------------------------------
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, f) => f(acc), x);

const slugify = pipe(
  (s) => s.trim().toLowerCase(),
  (s) => s.replace(/[^a-z0-9]+/g, "-"),
  (s) => s.replace(/^-|-$/g, ""),
);
console.log(slugify("  Hello, World!  ")); // "hello-world"

// --- Memoization: correct only for pure functions -------------------------
// WORTH RUNNING: the cache-key limitation is the part that bites in practice.

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args); // objects with differing key order miss
    if (!cache.has(key)) cache.set(key, fn(...args));
    return cache.get(key);
  };
}

let calls = 0;
const slowSquare = memoize((n) => {
  calls++;
  return n * n;
});
slowSquare(4);
slowSquare(4);
console.log(calls); // 1

const keyed = memoize((o) => Object.keys(o).length);
keyed({ a: 1, b: 2 });
keyed({ b: 2, a: 1 }); // same object, different key order -> cache MISS
console.log("distinct cache entries prove JSON keys are order-sensitive");

// --- Recursion has no TCO in V8 -------------------------------------------
// Node does not implement proper tail calls, despite the spec. Deep recursion
// throws rather than looping. Trampoline or iterate.

const trampoline = (fn) => (...args) => {
  let result = fn(...args);
  while (typeof result === "function") result = result();
  return result;
};
const sumTo = trampoline(function rec(n, acc = 0) {
  return n === 0 ? acc : () => rec(n - 1, acc + n);
});
console.log(sumTo(1e5)); // 5000050000 — no stack overflow
