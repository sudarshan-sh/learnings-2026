// example of Temporal Dead Zone (TDZ) in JavaScript
let x = 5;
{
  // console.log("x::::", x);
  // ReferenceError: Cannot access 'x' before initialization because 'x' is in TDZ (Temporal Dead Zone) which is the region between the start of the block and the point where 'x' is declared. And the variable if accessed before its declaration will throw a ReferenceError.
  let x = 7;
  console.log("x::::", x); // 7 — inner `x` is visible here
}

// example of scope
const a = "global a";
function inner() {
  return a;
}
function outer() {
  const a = "outer a";
  return inner();
}
outer(); // returns 'global a' because inner would invoke the variable a from where it is defined, not where it is called. This is because of lexical scoping in JavaScript. The inner function has access to the variables in its outer scope, which is the global scope in this case, not the outer function's scope.

// example of closure
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i); // 3, 3, 3 — because `var` is function-scoped, not block-scoped. The loop completes before the timeouts execute, so `i` is 3 in all cases.
    // function-scoped means that the variable `i` is accessible throughout the entire function in which it is declared, including inside the setTimeout callback. Since the loop has already completed by the time the callbacks are executed, they all reference the same `i`, which has a value of 3 after the loop ends.
  }, 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(function () {
    console.log(j); // 0, 1, 2 — because `let` is block-scoped. Each iteration of the loop creates a new binding for `j`, so the timeouts capture the correct value of `j` at each iteration.
    // block-scoped means that the variable `j` is only accessible within the block in which it is declared. Each iteration of the loop creates a new scope for `j`, so when the timeouts execute, they each reference a different `j` with the correct value at that point in the loop.
  }, 0);
}

// Example of event loop
console.log("Start");
setTimeout(() => {
  console.log("Timeout 1");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise 1");
});
console.log("End");

// ================================================================
// ================================================================
// ================================================================
// Event loop
async function process() {
  console.log(1);

  setTimeout(() => console.log(2), 0);

  await Promise.resolve();
  console.log(3);

  await new Promise((resolve) => setTimeout(resolve, 0));
  console.log(4);
}

console.log(5);
process();
console.log(6);

// 5 -> 1 -> 2 (macrotask mein jaayega) -> await ke baad sab microtask mein usse pehle check karo kuch global code mein, yes 6 is there so after 5 and 1, 6 would print, then check again if anything is remaining in global code, if no then everything is either in microtask or macrotask, so now 3 would print, again promise comes (ye promise tab tak resolve nahi hoga jab tak iske andar ka setTimeout fire nahi hoga, toh setTimeout ek macrotask hai toh usme already 2 hai toh ab 4 bhi chala jayega), toh ab sab bache hue microtask run honge aur fir macrotask so us hissab se neeche wala output aayega.

// output- 5 -> 1 -> 6 -> 3 -> 2 -> 4