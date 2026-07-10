// // 03 — Objects and prototypes

// // --- The chain is just a linked list of objects ---------------------------
// const animal = {
//   speak() {
//     return `${this.name} makes a sound`;
//   },
// };
// const dog = Object.create(animal, { name: { value: "Rex", enumerable: true } });

// console.log(dog.speak()); // "Rex makes a sound"
// console.log(Object.getPrototypeOf(dog) === animal); // true
// console.log(Object.hasOwn(dog, "speak")); // false — found via the chain

// // --- `class` is that, with syntax ----------------------------------------
// class Animal {
//   constructor(name) {
//     this.name = name;
//   }
//   speak() {
//     return `${this.name} makes a sound`;
//   }
// }
// class Dog extends Animal {
//   speak() {
//     return `${super.speak()}, specifically a bark`;
//   }
// }
// console.log(new Dog("Rex").speak());

// // Methods live on Animal.prototype, not on instances:
// console.log(Object.hasOwn(new Dog("x"), "speak")); // false
// console.log(Dog.prototype.__proto__ === Animal.prototype); // true

// // --- Shadowing writes own props; it does not mutate the prototype ---------
// // WORTH RUNNING: the assignment-vs-lookup asymmetry is the real lesson.

// const proto = { shared: 0 };
// const a = Object.create(proto);
// const b = Object.create(proto);
// a.shared = 1; // creates an OWN property on `a`
// console.log(a.shared, b.shared, proto.shared); // 1 0 0

// // But mutate through the chain and both see it:
// proto.shared = 99;
// console.log(a.shared, b.shared); // 1 99  — a still shadows

// // --- Property descriptors -------------------------------------------------
// const obj = {};
// Object.defineProperty(obj, "hidden", { value: 1, enumerable: false });
// console.log(Object.keys(obj)); // []      — enumerable: false
// console.log(obj.hidden); // 1
// console.log(JSON.stringify(obj)); // {}      — JSON skips non-enumerable

// // --- Freeze is shallow ----------------------------------------------------
// const config = Object.freeze({ nested: { mutable: true } });
// config.nested.mutable = false; // succeeds — freeze did not reach here
// console.log(config.nested.mutable); // false

// // --- Getters run on access; the value is not stored -----------------------
// let reads = 0;
// const lazy = {
//   get value() {
//     reads++;
//     return 42;
//   },
// };
// lazy.value;
// lazy.value;
// console.log(reads); // 2

// ==================================================================
// ==================================================================

const animal = { eats: true };
const dog = Object.create(animal);
dog.barks = true;
dog.eats; // true — found up the chain

const vehicle = {
  hasEngine: true,
  start() {
    return "starting...";
  },
};
const car = Object.create(vehicle);
car.wheels = 4;
car.hasEngine;

console.log("carObj", car);
console.log("start the car: ", car.start());
console.log("has car engine", car.hasEngine);

//
console.log("******rules of this binding******");
const user = {
  name: "Sam",
  regular() {
    return this?.name;
  },
  arrow: () => this?.name,
};

const fn = user.regular;

console.log(user.regular()); // Sam
console.log(user.arrow()); // undefined (arrow function do not have their own 'this' rather they inherit this from their enclosing lexical scope)
console.log(fn()); // undefined

// ==================================================================
// ==================================================================

// 1. Implicit Binding- while invoking a method of an object, we use dot notation to access it
// ex-1:
const blogInfo = {
  name: "Sudarshan",
  platform: "NFD",
  message: function () {
    console.log(`${this.name} has portal access on ${this.platform}`);
  },
};
blogInfo.message();

// ==================================================================
// ==================================================================

// ex-2:
function greeting(obj) {
  obj.logMsg = function () {
    console.log(`${this.name} is ${this.age} years old!!`);
  };
}

const tomInfo = {
  name: "Tom",
  age: 5,
};

const jerryInfo = {
  name: "Jerry",
  age: 4,
};

greeting(tomInfo);
greeting(jerryInfo);

tomInfo.logMsg();
jerryInfo.logMsg();

// ex-3
const person = {
  name: "John",
  address: {
    city: "Delhi",
    showCity() {
      console.log(this.city);
    },
  },
};

person.address.showCity();

// ==================================================================
// ==================================================================

// 2.Explicit binding-
// call
function greet() {
  console.log(this.name); // sudarshan
}
const userInfo = {
  name: "Sudarshan0",
};
greet.call(userInfo); // this = userInfo

// apply
// same as call, arguments are being passed as an array.
function greet1(city, age) {
  console.log(this.name, city, age);
}
const userInfoApply = {
  name: "Sudarshan1",
};
greet1.apply(userInfoApply, ["Jaipur", 25]);

// bind
// doesn't execute immediately, it returns a new function.
function greet2() {
  console.log(this.name);
}
const userInfoBind = {
  name: "Sudarshan2",
};
const func = greet2.bind(userInfoBind);
func();

// arrow functions
const pers = {
  name: "Raj",
  greetUser: () => {
    console.log(this.name);
  },
};
pers.greetUser();
// ==================================================================
// ==================================================================

// ex- call, apply, bind
function greetPer(g) {
  console.log(`${g}, ${this.name}`);
}
const p1 = { name: "JAMES" };

greetPer.call(p1, "Hi"); // "Hi, JAMES"
greetPer.apply(p1, ["Hi"]); // "Hi, JAMES"
greetPer.bind(p1)("Hi"); // "Hi, JAMES"
