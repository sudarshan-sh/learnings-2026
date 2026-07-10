// 05 — Asynchrony: microtasks, promises, async/await
//
// This is the file where running actually earns its keep. Ordering questions
// are the ones people get wrong from reading.

// --- Ordering: sync, then microtasks, then macrotasks ---------------------
// WORTH RUNNING. Predict the order before you run it.

console.log("1 sync");
setTimeout(() => console.log("5 timeout"), 0);
setImmediate(() => console.log("6 immediate")); // node-only, check phase
Promise.resolve().then(() => console.log("3 microtask"));
queueMicrotask(() => console.log("4 microtask"));
process.nextTick(() => console.log("2 nextTick")); // node: drains before promises
// The nextTick queue drains fully before the promise queue. That is a Node
// detail, not a language one — browsers have no nextTick.

// --- await yields to the microtask queue ----------------------------------
// WORTH RUNNING: `await` on a non-promise still defers.

async function demo() {
  console.log("a");
  await null; // still suspends: one microtask tick
  console.log("c");
}
demo();
console.log("b"); // prints between a and c

// --- Errors: rejection is not throw, until you await ----------------------
async function boom() {
  throw new Error("boom");
}
boom().catch((e) => console.log("caught:", e.message));

// An un-awaited rejected promise is an unhandled rejection, and in modern
// Node that terminates the process.

// --- Concurrency: all / allSettled / race / any ---------------------------
const ok = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
const bad = (e, ms) => new Promise((_, j) => setTimeout(() => j(new Error(e)), ms));

(async () => {
  console.log(await Promise.all([ok(1, 10), ok(2, 5)])); // [1, 2] — input order
  console.log((await Promise.allSettled([ok(1, 1), bad("x", 1)])).map((r) => r.status));
  console.log(await Promise.race([ok("fast", 1), bad("slow", 50)])); // "fast"
  console.log(await Promise.any([bad("a", 1), ok("b", 5)])); // "b" — ignores rejects

  // Promise.all is fail-fast but NOT cancelling: the other promises keep running.
  // If they have side effects, those side effects still happen.
})();

// --- The sequential-await trap --------------------------------------------
// WORTH RUNNING: the wall-clock difference is the point.

const work = (n) => new Promise((r) => setTimeout(() => r(n), 50));

(async () => {
  const t0 = Date.now();
  await work(1);
  await work(2); // ~100ms — serialized for no reason
  const serial = Date.now() - t0;

  const t1 = Date.now();
  await Promise.all([work(1), work(2)]); // ~50ms — started together
  const parallel = Date.now() - t1;

  console.log({ serial, parallel });
})();

// --- for-await over an async iterable -------------------------------------
async function* ticks(n) {
  for (let i = 0; i < n; i++) {
    await new Promise((r) => setTimeout(r, 10));
    yield i;
  }
}
(async () => {
  for await (const t of ticks(3)) console.log("tick", t);
})();
