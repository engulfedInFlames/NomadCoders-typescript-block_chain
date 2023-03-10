export {};
// https://www.typescriptlang.org/play

// Part 1: Call Signatures
type Add1 = (a: number, b: number) => number;
type Add2 = { (a: number, b: number): number };
const add: Add1 = (a, b) => a + b;
// ? What is diffenent with type alias ?

// Part 2: Overloading

// (1) 매개 변수의 data type이 다를 때, 예외 처리하는 방법
type Arg = {
  (a: number, b: number): boolean;
  (a: string, b: number): boolean;
};

// (2) 매개 변수의 data type은 같으나 그 수가 다를 때, 예외 처리하는 방법
type Max = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};
const findMax: Max = (a, b, c?: number) => {
  let max: number;
  if (!c) {
    max = Math.max(a, b);
  } else {
    max = Math.max(a, b, c);
  }
  return max;
};

// Paer 3: Polymorphism
type SuperPrint1 = {
  <T>(arr: T[]): void; // generic
};
type SuperPrint2 = {
  <T>(arr: T[]): T;
};
const Printer1: SuperPrint1 = (arr) => {
  arr.forEach((item) => console.log(item));
};
const Printer2: SuperPrint2 = (arr) => {
  return arr[0];
};

const arr1 = [1, 2, 3, 4];
const arr2 = [true, false, true, false];
const arr3 = ["Hello", "World!"];
const arr4 = [1, true, "Hello"];

Printer1(arr1);
Printer1(arr2);
Printer1(arr3);
Printer1(arr4);
console.log(Printer2(arr4));

// Part 4: Generics
// "generic" is not same with "any"
type SuperPrint3 = {
  <T, M>(a: T[], b: M): void;
};
const Printer3: SuperPrint3 = (arr) => {
  arr.forEach((item) => console.log(item));
};
// ❌ Printer3(arr1);


