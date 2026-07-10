// 03 — Objects and prototypes

// --- The chain is just a linked list of objects ---------------------------
const animal = {
  speak() {
    return `${this.name} makes a sound`;
  },
};
const dog = Object.create(animal, { name: { value: "Rex", enumerable: true } });

console.log(dog.speak()); // "Rex makes a sound"
console.log(Object.getPrototypeOf(dog) === animal); // true
console.log(Object.hasOwn(dog, "speak")); // false — found via the chain

// --- `class` is that, with syntax ----------------------------------------
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
}
class Dog extends Animal {
  speak() {
    return `${super.speak()}, specifically a bark`;
  }
}
console.log(new Dog("Rex").speak());

// Methods live on Animal.prototype, not on instances:
console.log(Object.hasOwn(new Dog("x"), "speak")); // false
console.log(Dog.prototype.__proto__ === Animal.prototype); // true

// --- Shadowing writes own props; it does not mutate the prototype ---------
// WORTH RUNNING: the assignment-vs-lookup asymmetry is the real lesson.

const proto = { shared: 0 };
const a = Object.create(proto);
const b = Object.create(proto);
a.shared = 1; // creates an OWN property on `a`
console.log(a.shared, b.shared, proto.shared); // 1 0 0

// But mutate through the chain and both see it:
proto.shared = 99;
console.log(a.shared, b.shared); // 1 99  — a still shadows

// --- Property descriptors -------------------------------------------------
const obj = {};
Object.defineProperty(obj, "hidden", { value: 1, enumerable: false });
console.log(Object.keys(obj)); // []      — enumerable: false
console.log(obj.hidden); // 1
console.log(JSON.stringify(obj)); // {}      — JSON skips non-enumerable

// --- Freeze is shallow ----------------------------------------------------
const config = Object.freeze({ nested: { mutable: true } });
config.nested.mutable = false; // succeeds — freeze did not reach here
console.log(config.nested.mutable); // false

// --- Getters run on access; the value is not stored -----------------------
let reads = 0;
const lazy = {
  get value() {
    reads++;
    return 42;
  },
};
lazy.value;
lazy.value;
console.log(reads); // 2
