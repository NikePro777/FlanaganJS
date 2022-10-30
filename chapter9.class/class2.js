// 9.3 Классы с ключевым словом class
class Range_ {
  constructor(from, to) {
    // Сохранить начальные и конечные точки (состояния) нового обьекта диапазона.
    // Эти свойства не являются унаследованными, т.е. они уникальны для данного обьекта.
    this.from = from;
    this.to = to;
  }

  // Метод который проверяет, входит ли число в диапазон
  includes(x) {
    return this.from <= x && x <= this.to;
  }

  // Генераторная функция позволяет экземплярам класса быть итерируемыми
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  }

  // Возвращает строковое представление диапазона
  toString() {
    return `(${this.from}...${this.to})`;
  }
}
let r = new Range_(1, 3);
r.includes(2); // true
console.log(r.toString());
console.log(...r); //1 2 3

// для того чтобы наш класс был наследственным от какого то другого, надо добавить extends :
class Span extends Range_ {
  constructor(start, length) {
    if (length >= 0) {
      super(start, start + length);
    } else {
      super(start + length, start);
    }
  }
}
// обьявления классов можно записать в виде выражений:
let square1 = function (x) {
  return x * x;
};
square1(3); // 9
// так же и с классами:
let Square = class {
  constructor(x) {
    this.area = x * x;
  }
};
new Square(3).area; //9
// Весь код в классе пишется в строгом режиме
//  В отличие от обьявлений функций, обьявления классов не поднимаются!

// 9.3.1 Cтатические методы
// Для того чтобы определить статический метод внутри класса , надо использовать static

class Range {
  constructor(from, to) {
    // Сохранить начальные и конечные точки (состояния) нового обьекта диапазона.
    // Эти свойства не являются унаследованными, т.е. они уникальны для данного обьекта.
    this.from = from;
    this.to = to;
  }

  // добавим статический метод. Такие методы вызываются на конструкторе, и поэтому в них нет смысле в this
  static parse(s) {
    let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      // Не удается разобрать диапазон
      throw new TypeError(`Cannot parse Range from '${s}'.`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }

  // Метод который проверяет, входит ли число в диапазон
  includes(x) {
    return this.from <= x && x <= this.to;
  }

  // Генераторная функция позволяет экземплярам класса быть итерируемыми
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  }

  // Возвращает строковое представление диапазона
  toString() {
    return `(${this.from}...${this.to})`;
  }
}

// таким образом мы создали метод который вызывается через Range.parse() а не Range.prototype.parse()
let s = Range.parse("(1...10)"); // возвращает новый обьект  Range
console.log(s);
//s.parse("(1...10)"); // TypeError

// 9.3.3 Открытые, закрытые и статические поля
// статическое поле должно быть не в теле класса

// Допустим мы написали класс, который инициализирует три поля:

class Buffer {
  constructor() {
    this.size = 0;
    this.capacity = 4096;
    this.buffer = new Uint8Array(this.capacity);
  }
}
const a = new Buffer();
console.log(a);

// поидее тоже самое можно уже так

class Buffer2 {
  size = 0;
  capacity = 4096;
  buffer = new Uint8Array(this.capacity);
}
const a1 = new Buffer2();
// a1.size = 1;
console.log(a1);

// доацстим мы хотим чтобы пользователь не мог изменить поле size нашего класса, тогда надо сделать его статическим (добавив#):
class Buffer3 {
  #size = 0; // в этом случае нам сначала необходимо обьявить закрытое поле, а затем уже использовать
  get size() {
    return this.#size;
  }
}
const a3 = new Buffer3();
a3.size = 1; // ошибки нет, но ничего не поменялось
console.log(a3);
console.log(a3.size); // 0

// static - если добавить перед определением закрытых или открытых полей, то такие поля будут создаваться как свойство конструктора а не экземпляра
// сделаем range.parse собственным статическим полем:
class Buffer4 {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  static integerRangePattern = /^\((\d+)\.\.\.(\d+)\)$/;
  static parse(s) {
    let matches = s.match(Buffer4.integerRangePattern);
    if (!matches) {
      throw new TypeError(`Cannot parse Range from '${s}'.`);
    }
    return new Buffer4(parseInt(matches[1]), parseInt(matches[2]));
  }
}
// если надо чтобы это поле было доступно только внутри класса , то надо назвать #pattern
let f = Buffer4.parse("(23...43)");
console.log(f);
