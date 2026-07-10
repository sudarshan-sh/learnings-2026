// 01 — Execution model: hoisting, TDZ, scope, closures, `this`
//
// NOTE: this is my template, not yours — you referenced one I don't have.
// Overwrite freely.

// --- Hoisting: declaration vs initialization -------------------------------
// `var` declarations are hoisted and initialized to undefined.
// `let`/`const` are hoisted but NOT initialized: the Temporal Dead Zone.

console.log("typeof notDeclaredAnywhere::::", typeof notDeclaredAnywhere); // "undefined" — no throw
try {
  // eslint-disable-next-line no-unused-vars
  console.log("inTDZ::::", inTDZ);
  var _unreachable = 1;
} catch (e) {
  console.log("ReferenceError::::", e.constructor.name); // ReferenceError
}
let inTDZ = 1;

// The asymmetry above is the whole point: an undeclared name is `undefined`,
// but a declared-and-not-yet-initialized name throws. `typeof` is not a
// safe guard for let/const the way it is for var.

// --- Closures capture bindings, not values --------------------------------
// WORTH RUNNING: the var/let difference here is the classic one.

const withVar = [];
for (var i = 0; i < 3; i++) withVar.push(() => i);
console.log(
  "withVar::::",
  withVar.map((f) => f()),
); // [3, 3, 3] — one binding, shared

const withLet = [];
for (let j = 0; j < 3; j++) withLet.push(() => j);
console.log(
  "withLet::::",
  withLet.map((f) => f()),
); // [0, 1, 2] — fresh binding per iteration

// --- `this` is call-site determined, except for arrows --------------------
// WORTH RUNNING: method extraction is where this bites in real code.

const counter = {
  n: 42,
  regular() {
    return this?.n;
  },
  arrow: () => globalThis.n,
};

console.log("counter.regular()::::", counter.regular()); // 42 — receiver is `counter`
const detached = counter.regular;
console.log("detached::::", detached()); // undefined — receiver is globalThis here (CJS is sloppy
//              mode); under strict mode `this` would be
//              undefined and `this.n` would throw. Same
//              output, different reason — hence the `?.`
console.log(
  "counter.regular.call({ n: 7 })::::",
  counter.regular.call({ n: 7 }),
); // 7 — receiver supplied

// Arrows have no own `this`; they close over the enclosing lexical `this`.
// That is why the arrow above can never see `counter`, no matter how called.

// --- Why closures leak, briefly -------------------------------------------
// A closure keeps its entire enclosing scope alive, not just the vars it uses
// (engines optimize this, but do not rely on it).

function makeLeaky() {
  const huge = new Array(1e6).fill("x");
  return () => huge.length; // holds `huge` for as long as the fn is reachable
}
const leak = makeLeaky();
console.log("leak::::", leak()); // 1000000
