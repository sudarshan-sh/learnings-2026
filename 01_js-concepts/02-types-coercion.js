// 02 — Types and coercion
//
// Most of this file you can read off the comments. The two marked
// WORTH RUNNING are the ones where the mechanism, not the answer, surprises.

// --- The primitive set ----------------------------------------------------
// undefined, null, boolean, number, bigint, string, symbol. Everything else
// is an object (functions and arrays included).

console.log(typeof null); // "object" — a 1995 bug, now load-bearing
console.log(typeof function () {}); // "function" — the one non-primitive typeof

// --- == performs coercion; === does not -----------------------------------
// The full == algorithm is short enough to hold in your head:
//   null == undefined, and neither equals anything else.
//   number vs string  -> string becomes number
//   boolean vs any    -> boolean becomes number first
//   object vs prim    -> object becomes primitive (valueOf, then toString)

console.log(null == undefined); // true
console.log(null == 0); // false — null coerces to nothing
console.log([] == false); // true  — [] -> "" -> 0, false -> 0
console.log([] == ![]); // true  — same thing, dressed up

// --- ToPrimitive is a real protocol you can hook --------------------------
// WORTH RUNNING: watching the hint arrive is the part reading can't give you.

const probe = {
  [Symbol.toPrimitive](hint) {
    console.log("  hint:", hint);
    return hint === "number" ? 10 : "ten";
  },
};
console.log(`${probe}`); // hint: string  -> "ten"
console.log(+probe); // hint: number  -> 10
console.log(probe + ""); // hint: default -> "ten"

// `+` uses hint "default", not "string" — which is why `date + ""` gives a
// date string but `date - 0` gives a timestamp.

// --- NaN, -0, and the three equalities ------------------------------------
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false
console.log([NaN].includes(NaN)); // true  — includes uses SameValueZero
console.log([NaN].indexOf(NaN)); // -1    — indexOf uses ===

// --- Numbers are float64; bigint is not -----------------------------------
// WORTH RUNNING: the precision cliff is easier to believe once seen.

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true
console.log(2n ** 64n); // exact
try {
  console.log(1n + 1);
} catch (e) {
  console.log(e.constructor.name); // TypeError — no implicit bigint/number mixing
}
