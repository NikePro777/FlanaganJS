// 6.7 Расширение обьектов
let target = { x: 1 },
  source = { y: 2, z: 3 };
for (let key of Object.keys(source)) {
  target[key] = source[key];
}
console.log(target); // Вот это все делает Object.assign(куда, откуда, откуда2...)
let o = Object.assign({}, target); // первый аргумент пустой, так как мы создали новый обьект
console.log(o);
// Чтобы пропускать те свойства, которые итак есть в обьекте:
function merge(target, ...sources) {
  for (let source of sources) {
    for (let key of Object.keys(source)) {
      if (!(key in target)) {
        //Этим и отличается от Object.assign
        target[key] = source[key];
      }
    }
  }
  return target;
}
console.log(Object.assign({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 })); //{x: 2, y: 3, z: 4}
console.log(merge({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 })); //{x: 1, y: 2, z: 4}
// 6.8 Сериализация обьектов - процесс преобразования обьекта в строку, с возможностью восстановления
o = { x: 1, y: { z: [false, null, ""] } }; // исходник
console.log(o);
let s = JSON.stringify(o); // преобразовали в строку
console.log(s);
let p = JSON.parse(s); // восстановили
console.log(p);
// JSON поддерживает сериализацию практически всего, только:
// NaN, Infinity, -infinity => null
//Date - сериализуется в строки (ISO) но обратно не восстановятся
// function, RegExp, undefined, Error - не могут сериализоваться
// JSON сериализует только перечисляемые собственные свойства обьекта, остальные опускает

// 6.9 Методы Object
// 6.9.1 toString() - преобразует обьектв строку.
s = { x: 1, y: 1 }.toString();
console.log(s); //[object Object]
// toString сам по себе не оч информативен, поэтому классы определяют собственные версии toString. Например у массива каждый эл-т записывается в строку.
// а у функции в строку записывается исходный код
let point = {
  x: 1,
  y: 2,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
};
console.log(String(point));
console.log(
  String(function () {
    return `(${this.x}, ${this.y})`;
  })
);
// 6.9.2 Метод toLocalString() ... хер пойми чем отличается. Даты пытаеся вернуть согласно локальным соглашениям (хз что это)
point = {
  x: 1000,
  y: 2000,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
  toLocaleString: function () {
    return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
  },
};
console.log(point.toString()); // (1000, 2000)
console.log(point.toLocaleString()); // (1 000, 2 000) нууу разделители вот появились)

// 6.9.3 Метод valueOf()
// В общем когда интерпретатору нужны числа, то вызывается этот метод. Благодаря нему даты можно сравнивать
point.x = 3;
point.y = 4;
point.valueOf = function () {
  return Math.hypot(this.x, this.y);
};
console.log(Number(point)); // 5 ...т.е.  valueOf преобразовал все в числа.... ток где x,y хз... Зато теперь сравнивать можно:
console.log(point == 5); //true
console.log(point > 5); //false
// 6.9.4 Метод toJSON()
// Этого метода нет у object.prototype но он есть у каждого обьекта подлежащим сериализации (JSON.stringify())
point = {
  x: 1,
  y: 2,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
  toJSON: function () {
    return this.toString();
  },
};
console.log(JSON.stringify([point])); // ["(1, 2)"]

// 6.10 Расширенный синтаксис обьектных литералов
// 6.10.1 Сокращенная запись свойств
// Если у нас есть какие то свойства и мы хотим создать обьект с ними то не надо так :
let x = 1,
  y = 2;
o = {
  x: x,
  y: y,
};
console.log(o);
// гораздо проще так:
let q = { x, y };
console.log(q);

// 6.10.2 Вычисляемые имена свойст
// Чтобы в обьект добавить свойство, которое вычисляется функцией или хранится в переменной:
const PROPERTY_NAME = "p1";
function computePropertyName() {
  return "p" + 2;
}

o = {};
o[PROPERTY_NAME] = 1;
o[computePropertyName()] = 2; // Можно проще:

p = {
  [PROPERTY_NAME]: 1,
  [computePropertyName()]: 2, // в общем суть, что квадратные скобки можно сразу сюда помещать
};
console.log(o.p1); // так как проперти нэйм равно р1, то вот оно и вернулось
console.log(p.p2); // аналогично
// В квадратных скобках помещается ВЫЧИСЛЯЕМОЕ значение (если надо - преобразованное в строку) которое используется в качестве имени

// 6.10.3 Символы в качестве имен свойств
// зная [] можно работать с символами:
const extension = Symbol("my symbol");
o = {
  e: 1,
  [extension]: {},
};
o[extension].x = 0;
console.log(o);

// 6.10.4 Операция распространения
// Теперь можно копировать св-ва существующего обьекта в новый обьект используя ...
let position = { x: 0, y: 0 };
let diamensions = { width: 100, heigth: 75 };
let rect = { ...position, ...diamensions };
console.log(rect);
// Если в новом обьекте и в том из которого мы копируем свойства есть свойство с одним и тем же именем, то результатом будет то, которое будет последним
// операция распространения распространяет только собственные свойства объекта (не наследованные)

// 6.10.5 Сокращенная запись методов
let square = {
  area: function () {
    return this.side * this.side;
  },
  side: 10,
};
console.log(square.area()); // 100
// Однако в ES6 все это можно делать сокращенно:
let square2 = {
  area() {
    // название функции это и есть имя свойства
    return this.side * this.side;
  },
  side: 10,
};
console.log(square2.area());

const METHOD_NAME = "m";
const symbol = Symbol();
let weirdMethods = {
  "method With Spaces"(x) {
    return x + 1;
  },
  [METHOD_NAME](x) {
    return x + 2;
  },
  [symbol](x) {
    return x + 3;
  },
};
console.log(weirdMethods["method With Spaces"](1)); //2
console.log(weirdMethods.m(1)); //3
console.log(weirdMethods[METHOD_NAME](1)); //3
console.log(weirdMethods[symbol](1)); //4

// 6.10.6 Методы получения и установки свойств
o = {
  dataProp: 1, // -обычкновенное свойство с данными
  get accessorProp() {
    return this.dataProp; // свойство с методами доступа. чтение(получение)
  },
  set accessorProp(value) {
    // свойство с методами доступа. запись (установка)
    this.dataProp = value;
  },
};
o.dataProp = 123;
console.log(o); // ну крч пока не понятно

p = {
  // x,y - обыкновенные свойства с данными, допускающие чтение и запись
  x: 1.0,
  y: 1.0,
  // r - свойство с методами доступа, допускающее чтение и запись, с методами получения установки
  get r() {
    return Math.hypot(this.x, this.y);
  },
  set r(newvalue) {
    let oldvalue = Math.hypot(this.x, this.y);
    let ratio = newvalue / oldvalue;
    this.x *= ratio;
    this.y *= ratio;
  },
  // theta - свойство с методами доступа, допускающее только чтение
  get theta() {
    return Math.atan2(this.y, this.x);
  },
};
console.log(p.r);
console.log(p.theta); //  в общем теперь мы можем менять х и у, поменяются свойства r и theta
// Все эти свойства собственные(в т.ч. методы), так что все унаследуется
q = Object.create(p);
q.x = 3;
q.y = 4;
console.log(q.r);
console.log(q.theta);

// Следующий обьект генерирует строго увеличивающиеся порядковые номера
const serialnum = {
  _n: 0, // свойство котрое хранит следующий порядковый номер. _ в имени означает что это свойство предназначено только для внутреннего использования
  get next() {
    return this._n++; // возратить текущее значение и инкрементировать его
  },
  set next(n) {
    if (n > this._n) {
      // установить новое значение только если оно больше предыдущего
      this._n = n;
    } else
      throw new Error(
        "Порядковые номера можно устанавливать только в большее значение"
      );
  },
};
console.log((serialnum.next = 10)); // Установили начальное значение. Теперь при каждом запросе оно будет увеличиваться на 1
console.log(serialnum.next);
console.log(serialnum.next);
console.log((serialnum.next = 15));
// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
const random = {
  get octet() {
    return Math.floor(Math.random() * 256);
  },
  get uint16() {
    return Math.floor(Math.random() * 65536);
  },
  get int16() {
    return Math.floor(Math.random() * 65536) - 32768;
  },
};
console.log(random.octet);
console.log(random.octet);
console.log(random.octet);
console.log(random.octet);
