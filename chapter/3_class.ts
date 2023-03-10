export {};
// https://www.typescriptlang.org/play

// Part 1 Basic Type of Class
class Player1 {
  constructor(private firstName: string, private lastName: string) {}
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const charile = new Player1("Charile", "Puth");
console.log(charile.getFullName());

// Part 2 Abstract Class
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    protected username: string
  ) {}
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  getUsername(): string {
    return this.username;
  }
  abstract changeUsername(username: string): void; // abstract method는 실제 class에서 반드시 구현되어야 한다.
}
class Player2 extends User {
  changeUsername(username: string): void {
    if (this.username !== username) {
      this.username = username;
    }
  }
}

const lewis = new Player2("Lewis", "Capaldi", "cutypity");
console.log(lewis.getUsername());
lewis.changeUsername("littlePumpkin");
console.log(lewis.getUsername());

// Part 3 Let's Make a Dictionary!
type Words = {
  [key: string]: string | string[];
};
class Word {
  constructor(public term: string, public def: string | string[]) {}
  toString() {
    console.log(`${this.term}: ${this.def}`);
  }
  addDef(def: string) {
    if (typeof this.def === "string") {
      this.def = [this.def, def];
    } else {
      this.def = [...this.def, def];
    }
  }
}
class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word): void {
    if (!this.words[word.term]) {
      this.words[word.term] = word.def;
    }
  }
  remove(term: string) {
    if (this.words[term]) {
      delete this.words[term];
    }
  }
  find(term: string) {
    if (this.words.hasOwnProperty(term)) {
      console.log(`${term}: ${this.words[term]}`);
    } else console.log(`"${term}" is not in this dictionary.`);
  }
  update(oldTerm: string, newTerm: string) {
    if (this.words.hasOwnProperty(oldTerm) && oldTerm !== newTerm) {
      this.words[newTerm] = this.words[oldTerm];
      delete this.words[oldTerm];
    }
  }
  size() {
    return Object.keys(this.words).length;
  }
  all() {
    for (const [key, value] of Object.entries(this.words)) {
      console.log(`${key}: ${value}`);
    }
  }
}

const kimchi = new Word("Kimchi", "한국의 음식");
const tang = new Word("연근 갈비탕", "중국의 음식");
const sushi = new Word("스시", "일본의 음식");
kimchi.addDef("고춧가루로 배추를 버무려 숙성 및 발효시킨 음식");
sushi.addDef("밥을 뭉쳐놓고 그 위에 재료를 얹어낸 음식");
kimchi.toString();
tang.toString();
sushi.toString();
console.log("///////////////////////////////////////////////////");
const dict = new Dict();
dict.add(kimchi);
dict.add(tang);
dict.add(sushi);
dict.all();
console.log(dict.size());
console.log("///////////////////////////////////////////////////");
dict.find("Kimchi");
dict.update("Kimchi", "김치");
dict.find("김치");
dict.remove("연근 갈비탕");
dict.all();

// Part 4 Interfaces
type Team = "red" | "blue" | "yellow"; // Type alias
type Health = 0 | 5 | 10;
///////////////////////////////////////////////////////
type Player3 = {
  name: string;
  team: Team;
  health: Health;
};
type NationalPlayer = Player3 & {
  nation: string;
};
const kim: NationalPlayer = {
  name: "Kyung-Su Kim",
  team: "red",
  health: 0,
  nation: "Korea",
};
///////////////////////////////////////////////////////
// Interface는 object의 모양을 설명하는데 유용하며, 중첩이 가능하다.
// 또한 JS에서 추척되지 않으므로, 실제 코드를 경량화 하는 데에도 유용하다.
interface Player4 {
  name: string;
}
interface Player4 {
  team: Team;
}
interface Player4 {
  health: Health;
}

interface UniPlayer extends Player4 {
  university: string;
}
const ariana: UniPlayer = {
  name: "Ariana Grande",
  team: "blue",
  health: 5,
  university: "Harvard",
};

// Part 5 Interfaces and Abstract Class
// Abstract Class 코드는 실제 컴파일 된 JS 코드상에도 존재한다.
// Type이나 Interface는 본래 JS 문법이 아니기 때문에 컴파일시 코드상에 남지 않는다. (경량화)
// "implements"를 통해 Class가 특정 interface또는 type의 조건를 충족하는지 확인할 수 있다.
// 단순히 type을 강제하고자 한다면 inteface를 쓰는 것이 좋다.
// Class는 여러 interface를 구현할 수 있다.
// Interface 장점 (1) Class나 Object의 모양을 알려줌, (2) 코드를 줄이는 데에 도움 됨, (3) type으로도 사용할 수 있음
// Interface 단점 (1) private, protected를 사용할 수 없음

// Part 6 Polymorphism
type Item = {
  name: string;
  count?: number;
};
interface IStorage<T> {
  [key: string]: T;
}
class MyStroage<T> {
  private storage: IStorage<T> = {};
  add(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string) {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const itemA: Item = {
  name: "pencil",
  count: 126,
};
const itemB: Item = {
  name: "pen",
  count: 289,
};
const stationaryStorage = new MyStroage<Item>();
stationaryStorage.add("A", itemA);
stationaryStorage.add("B", itemB);
console.log(stationaryStorage);
console.log(stationaryStorage.get("A"));
console.log(stationaryStorage.get("B"));
stationaryStorage.remove("A");
console.log(stationaryStorage);
stationaryStorage.clear();
console.log(stationaryStorage);
