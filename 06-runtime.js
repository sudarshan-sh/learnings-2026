// 06 — The runtime: event loop phases, memory, modules

// --- Event loop phases (Node) ---------------------------------------------
// timers -> pending -> poll -> check -> close
//   setTimeout/setInterval  -> timers
//   setImmediate            -> check
//   I/O callbacks           -> poll
// Between EVERY callback, the microtask queues drain (nextTick, then promises).

// WORTH RUNNING: this ordering is genuinely nondeterministic at top level,
// because timers-vs-check depends on how long the loop took to start.
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
// Run this a few times. Inside an I/O callback, immediate ALWAYS wins;
// at top level it is a coin flip. That is the useful fact.

require("fs").readFile(__filename, () => {
  setTimeout(() => console.log("io: timeout"), 0);
  setImmediate(() => console.log("io: immediate")); // deterministic: first
});

// --- Blocking the loop ----------------------------------------------------
// One thread runs your JS. A synchronous loop starves timers, I/O, everything.

function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {} // nothing else runs
}
// blockFor(1000); // uncomment and watch the timers above fire late

// --- Memory: reachability, not reference counting -------------------------
// GC frees what is unreachable from a root. Cycles are fine.
let x = { name: "a" };
let y = { name: "b" };
x.peer = y;
y.peer = x; // cycle — still collectable once x and y are dropped
x = y = null;

// WeakMap/WeakRef hold values without preventing collection:
const meta = new WeakMap();
{
  const key = { id: 1 };
  meta.set(key, "attached");
  console.log(meta.get(key)); // "attached"
} // key becomes unreachable; the entry goes with it

// --- Modules: CJS vs ESM --------------------------------------------------
// This file is CJS (no package.json "type": "module"). Key differences:
//
//   CJS                              ESM
//   require() is synchronous         import is hoisted, static, async-graph
//   exports is a mutable object      exports are live read-only bindings
//   __dirname / __filename exist     use import.meta.url
//   circular deps -> partial object  circular deps -> TDZ error or undefined
//
// Live bindings, concretely: in ESM, `import { count }` sees later mutations
// made inside the exporting module. In CJS, you copied a value at require time.

console.log("cjs:", typeof require, typeof module.exports);

// --- process is the boundary to the OS ------------------------------------
console.log({
  node: process.version,
  platform: process.platform,
  heapMB: Math.round(process.memoryUsage().heapUsed / 1e6),
});
