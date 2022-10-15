// 9.5 Классы и подклассы
// Предположим что нужно определить подкласс span класса Range
// Тупо копируем из 9.2
class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
  static parse(s) {
    let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
    if (!matches) {
      // Не удается разобрать диапазон
      throw new TypeError(`Cannot parse Range from '${s}'.`);
    }
    return new Range(parseInt(matches[1]), parseInt(matches[2]));
  }
  includes(x) {
    return this.from <= x && x <= this.to;
  }
  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) yield x;
  }
  toString() {
    return `(${this.from}...${this.to})`;
  }
}
// Span  работать будет так же как Range но только не начало и конец, а начало и промежуток будем задавать
// Ну и естественно он наследует все методы

// Функция конструктор для нашего подкласса
function Span(start, span) {
  if (span >= 0) {
    this.from = start;
    this.to = start + span;
  } else {
    this.to = start;
    this.from = start + span;
  }
}

// показываем, что прототип наследуется от Range
Span.prototype = Object.create(Range.prototype);
// Так как конструктор не хотим наследовать - определяем свой
Span.prototype.constructor = Span;
// Так как мы определяем метод toString() то спан его переопределит, иначе бы тупо унаследовал.
Span.prototype.toString = function () {
  return `(${this.from}... +${this.to - this.from})`;
};

// 9.5.2 Создание подклассов с использованием extends и super
// Cоздадим подклас от Array и добавим методы получения первого и последнего элементов
class EZArray extends Array {
  get first() {
    return this[0];
  }
  last() {
    return this[this.length - 1];
  }
} // т.е. мы полностью наследуем все свойства array и при этом у нас есть два своих
let a = new EZArray();
console.log(a instanceof EZArray); // true
console.log(a instanceof Array); // true
a.push(1, 2, 3, 4);
console.log(a.length); //4 т.е. мы используем все методы унаследованные от Array
a.pop();
console.log(a);
console.log(a.first);
console.log(a.last()); // ну и естественно работают наши
console.log(Array.isArray(a)); // true действительно является массивом
console.log(EZArray.isArray(a)); // true подкласс наследует и статические методы

//9.6 Теперь сделаем более сложный пример унаследуем класс от Map:
class TypedMap extends Map {
  constructor(keyType, valueType, entries) {
    // если entries есть, то определим их типы:
    if (entries) {
      for (let [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Неправильный тип для записи [${k}, ${v}]`);
        }
      }
    }
    // Инициализируем суперкласс начальными записями (с проверенными типами)
    super(entries);
    // инициализируем класс this сохранив типы
    this.keyType = keyType;
    this.valueType = valueType;
  }

  // Теперь переопределим метод set() добавив проверку типов для любых новых записей, добавляемых к отображению
  set(key, value) {
    // Генерируем ошибку если ключ или значение имеют неправильный тип
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} не относится к типу ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} не относится к типу ${this.valueType}`);
    }

    // Если все корректно, вызываем версию метода set из суперкласса для фактическкогто добавление записи в отображение
    // мф возвращаем то, что возвращает метод суперкласса
    return super.set(key, value); // тут очень важно, мы используем super, т.е. вызываем метод set не который мы переопределили, а который есть у нашего суперкласса Map
  }
}

// Использование super() в конструкторах
// если мы определяем класс с ключевым словом extends тогда super() обязательно должно быть для вызова конструктора суперкласса
// если мы не определили конструктор, то он будет автоматически определен
// мы не можем использовать this в конструкторе пока не вызовем конструткор суперкласса методом super()
// new.target является ссылкой на вызванный конструктор. Говоря по русски когда применяется метод super конструктор суперкласса видит это как new.target
// п о хорошему суперкласс не должен знать создаются ли из него подклассы, но иногда полезно применять new.target.name
