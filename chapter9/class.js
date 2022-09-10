//9.1 Классы и прототипы
// Класс в js это набор обьектов, которые наследуют свойства какого то обьекта - прототипа.

// Определяется фабричная функция, которая создает и инициализирует новый экземпляр данного класса
function range(from, to) {
  // Используем Object.create() для создания обьекта, который наследуется от обьекта прототипа, определенного ниже. Обьект прототипа
  // хранится как свойство этой функции и определяет разные методы (поведение) для всех обьектов, представляющих диапазоны.
  let r = Object.create(range.methods);

  // Сохраняет начальную и конечную точки (состояние) нового обьекта диапазона. Эти свойства не являются наследуемыми и уникальны для этого обьекта
  r.from = from;
  r.to = to;

  // возвращаем новый обьект
  return r;
}

// А здесь обьект прототипа, определяющий свойства, которые наследуются
range.methods = {
  // Возвращает true если x входит в диапазон
  //Работает с числами, текстами и date
  includes(x) {
    return this.from <= x && x <= this.to;
  },
  // Генераторная функция, которая делает экземпляры итерируемыми. работает только с числами
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  },

  // Возвращает строковое представление диапазона
  toString() {
    return "(" + this.from + "..." + this.to + ")";
  },
};
let r = range(1, 3); // Создали обьект диапазона
console.log(r.includes(2)); // true т.к. ыходит в диапазон
console.log(r.toString()); // (1...3)
console.log(...r); // 1 2 3
let t = range(1, 5);
console.log(t);

// 9.2 Классы и конструкторы
// Конструктор - функция для инициализации вновь созданных обьектов, вызываются с применением ключевого слова new
// перепишем код 9.1 используя функцию конструктора, но не используя class

// Функция которая инициализирует новые обьекты Range.
// Не создает и не возвращает обьект! просто инициализирует this
function Range2(from, to) {
  // Отмечает начальную и конечные точки обьекта. Будет уникальным (не является наследовательным)
  this.from = from;
  this.to = to;
}

// от этого обьекта наслудуются все обьекты range
// NИменем свойства должно быть prototype чтобы это работало
Range2.prototype = {
  // такие же функции, как и в 9.1
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },

  [Symbol.iterator]: function* () {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  },

  toString: function () {
    return "(" + this.from + "..." + this.to + ")";
  },
};
let r2 = new Range2(1, 3); // создали новый обьект range2
console.log(r2.includes(2));
console.log(r2.toString());
console.log(...r2);
console.log(r2);
// Особенности примера 2
// имена конструкторов с большой буквы (Range2 вместо range)
// ключевое слово new (без него будет работать неправильно), а с ним вызывается конструктор, который сам создает новый обьект и возвращает его
// еще одно отличие - использование prototype - автоматически использует прототип (в первом случае range.methods был прототипом)
// стрелочные функции не используются, т.к. не имеют свойства prototype и this стрелочные функции не устанавливают а наследуют

// 9.2 Конструкторы, идентичность классов, instanceof
//  Если мы имеем обьект r2 и хотим выяснить является ли он обьектом Range томожем записать:
console.log(r2 instanceof Range2); //true наследование не обязательно д.б прямым. Если в r2 мы запишем еще методы, то эти методы так же будут давать true для Range2

function Strange() {}
Strange.prototype = Range2.prototype;
new Strange() instanceof Range2; // true но это для метода instanceof формально обьект Strange не будет иметь свойств from и to

// елси мы хотим проверить цепочку прототипов обьекта не используя конструктор. Можем обратиться к методу isPrototupeOf:
console.log(range.methods.isPrototypeOf(r)); // true т.е. range.methods обьект прототипа

// 9.2.2 Свойство constructor
// Каждая функция js (кроме стрелочных асинхронных и генераторных) распологает свойством prototype
// Значениями свойства prototype будет обьект, который имеет единственное свойство - constructor
// Значением свойства constructor является обьект функции:
let F = function () {}; // Обьект функции
let p = F.prototype; // Обьект прототипа, ассоциированный с F
let c = p.constructor; // функция, ассоциированная с прототипом
console.log(c === F); // true: F.prototype.constructor === F для любого обьекта F
console.log(F);
console.log(p);
console.log(c);
// Конструктор <---- constructor    Экземпляры
// Range()              includes  <-- new Range(1)
//  prototype------>     toString <-- new Range(2)

// Существование предварительно определенного обьекта прототипа с его свойством constructor означает, что обьекты обычно наследуют свойство constructor, которое ссылается на их конструктор
// Поскольку конструкторы служат открытой идентичностью класса, свойство constructor выдает класс обьекта (крч Конструктор и Класс +- одно и тоже)

let o = new F(); // Создать обьект о класса F
o.constructor === F; // true: свойство constructor указывает класс

// Тем не менее в действительности класс Range переопределяет прототип собственным обьектом, не имеющего свойства конструктор:
console.log(Range.constructor);
// мы можем устранить проблему, явно добавляя конструктор к прототипу:
Range.prototype = {
  constructor: Range, //явно устанавливая ссылку на конструктор, далее идут методы
};
console.log(Range2.constructor);
// Есть еще метод, как расширить прототип не переопределяя конструктор:
Range2.prototype.newProperty = function () {
  console.log("еще свойство");
};
r2.newProperty();
