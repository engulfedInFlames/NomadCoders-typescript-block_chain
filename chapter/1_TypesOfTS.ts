export {};
// https://www.typescriptlang.org/play

// // Part 1
const user = { name: "Kane", age: 12 };
const User: { name: string; age: number } = {
  name: "Alis",
  age: 16,
};
console.log(user.name);
console.log("My name is ", User.name, ", I'm ", User.age, "years old.");

type Player = {
  name: string;
  age?: number;
};
const user1: Player = {
  name: "Jane",
};
if (user1.age) {
  console.log(user1.name, ", age identified.");
} else {
  console.log(user1.name, ", age unidentified.");
}

function PlayerMaker(name: string, age?: number): Player {
  return {
    name, // same with $ name = name
  };
}
const PlayerMaker2 = (name: string, age?: number): Player => {
  return {
    name,
  };
};

const user2 = PlayerMaker("Hector");
console.log("My name is ", user2.name);

// // Part 2
type Player2 = {
  readonly name: string;
  age?: number;
};
const user3: Player2 = {
  name: "Tom",
  age: 21,
};
// ❌ user3.name="Karl";
const arr1: readonly string[] = ["H", "E", "L", "L", "O"];
const arr2: [string, number, boolean] = ["Hello", 7, true];
// ❌ arr1[0] = "K";
// ❌ arr2[0] = true;

// Part 3
let a: unknown;
// ❌ a = a + 1;
if (typeof a === "number") {
  a = a + 1;
} else if (typeof a === "string") {
  a = "Hello";
} // type을 검사하고 난 뒤에 데이터 처리가 가능하다.
