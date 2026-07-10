// example of Temporal Dead Zone (TDZ) in JavaScript
let x = 5;
{
  console.log("x::::", x);
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

// do not generate the below code output please-
// question: What is the output of the following code snippet based on lexical scoping?
function outer() {
  const a = "outer a";
  function inner() {
    return a;
  }
  return inner();
}
